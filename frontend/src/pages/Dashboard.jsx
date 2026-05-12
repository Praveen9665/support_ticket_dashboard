import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LogOut, RefreshCw, Search, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import TicketTable from "../components/TicketTable";
import TicketDetailsModal from "../components/TicketDetailsModal";

const priorities = ["", "Low", "Medium", "High", "Critical"];
const statuses = ["", "Open", "In Progress", "Escalated", "Resolved"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchTickets = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      setError("");
      const { data } = await axiosInstance.get("/tickets", {
        params: { search: debouncedSearch, priority, status },
      });
      setTickets(data.data || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tickets. Please check backend server.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, priority, status]);

  useEffect(() => {
    fetchTickets(true);
  }, [fetchTickets]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTickets(false);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchTickets]);

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter((t) => t.status === "Open").length,
    escalated: tickets.filter((t) => t.status === "Escalated").length,
    resolved: tickets.filter((t) => t.status === "Resolved").length,
  }), [tickets]);

  const handleStatusChange = async (id, nextStatus) => {
    const previousTickets = [...tickets];
    try {
      // Optimistic update
      setTickets((prev) =>
        prev.map((ticket) => (ticket.id === id ? { ...ticket, status: nextStatus } : ticket))
      );
      setUpdatingId(id);

      const { data } = await axiosInstance.put(`/tickets/${id}`, { status: nextStatus });

      // Update with actual data from server
      setTickets((prev) => prev.map((ticket) => (ticket.id === id ? data.data : ticket)));
      toast.success("Ticket status updated");
    } catch (err) {
      // Rollback on error
      setTickets(previousTickets);
      toast.error(err.response?.data?.message || "Status update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("support_demo_login");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Support Ticket Dashboard</h1>

          </div>
          <div className="flex gap-3">
            <button onClick={() => fetchTickets(true)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <RefreshCw size={16} /> Refresh
            </button>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Tickets" value={stats.total} icon={Search} color="bg-indigo-600" />
          <StatCard label="Open" value={stats.open} icon={RefreshCw} color="bg-blue-500" />
          <StatCard label="Escalated" value={stats.escalated} icon={AlertCircle} color="bg-rose-500" />
          <StatCard label="Resolved" value={stats.resolved} icon={CheckCircle} color="bg-emerald-500" />
        </div>

        <section className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by customer, subject, or ticket ID"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
              />
            </div>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500">
              {priorities.map((item) => <option key={item} value={item}>{item || "All Priorities"}</option>)}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500">
              {statuses.map((item) => <option key={item} value={item}>{item || "All Statuses"}</option>)}
            </select>
          </div>
        </section>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center font-semibold text-slate-500">Loading tickets...</div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center font-semibold text-red-700">{error}</div>
        ) : tickets.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center font-semibold text-slate-500">No tickets found.</div>
        ) : (
          <TicketTable
            tickets={tickets}
            updatingId={updatingId}
            onStatusChange={handleStatusChange}
            onView={(id) => setSelectedTicketId(id)}
          />
        )}

        {selectedTicketId && (
          <TicketDetailsModal
            ticketId={selectedTicketId}
            onClose={() => setSelectedTicketId(null)}
          />
        )}
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
    <div className={`absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full opacity-5 transition-transform group-hover:scale-110 ${color}`}></div>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-black text-slate-900">{value}</p>
      </div>
      <div className={`rounded-2xl p-3 text-white shadow-lg ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

export default Dashboard;
