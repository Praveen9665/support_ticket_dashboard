import React, { useEffect, useState } from "react";
import { X, Clock, User, Tag, AlertCircle, CheckCircle, Info } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import { formatDateTime } from "../utils/formatDate";

const TicketDetailsModal = ({ ticketId, onClose }) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/ticket/${ticketId}`);
        setTicket(data.data);
      } catch (err) {
        setError("Failed to load ticket details.");
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) fetchTicketDetails();
  }, [ticketId]);

  if (!ticketId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-900">Ticket Details</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
              <p className="mt-4 text-sm font-medium text-slate-500">Fetching ticket information...</p>
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-rose-50 p-6 text-center">
              <AlertCircle className="mx-auto mb-2 text-rose-500" size={32} />
              <p className="font-semibold text-rose-700">{error}</p>
              <button
                onClick={onClose}
                className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-bold text-rose-600 shadow-sm border border-rose-200"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Ticket #{ticket.id}</span>
                  <h3 className="mt-1 text-2xl font-black text-slate-900 leading-tight">{ticket.subject}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <PriorityBadge priority={ticket.priority} />
                  <StatusBadge status={ticket.status} />
                </div>
              </div>

              <div className="grid gap-6 rounded-2xl border border-slate-100 bg-slate-50/30 p-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-white p-2 text-indigo-500 shadow-sm">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Customer</p>
                    <p className="mt-0.5 font-bold text-slate-700">{ticket.customer_name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-white p-2 text-indigo-500 shadow-sm">
                    <Tag size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Assigned Agent</p>
                    <p className="mt-0.5 font-bold text-slate-700">{ticket.assigned_agent}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-white p-2 text-indigo-500 shadow-sm">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Created At</p>
                    <p className="mt-0.5 font-bold text-slate-700">{formatDateTime(ticket.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-white p-2 text-indigo-500 shadow-sm">
                    <Info size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Last Updated</p>
                    <p className="mt-0.5 font-bold text-slate-700">{formatDateTime(ticket.updated_at)}</p>
                  </div>
                </div>
              </div>


            </div>
          )}
        </div>

        <div className="border-t border-slate-100 px-6 py-4 flex justify-end bg-slate-50/50">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsModal;
