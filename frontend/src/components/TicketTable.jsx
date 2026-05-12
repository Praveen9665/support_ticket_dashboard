import React from "react";
import { formatDateTime } from "../utils/formatDate";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

import { Info } from "lucide-react";

const statuses = ["Open", "In Progress", "Escalated", "Resolved"];

const TicketTable = ({ tickets, updatingId, onStatusChange, onView }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {[
                "Ticket ID",
                "Customer",
                "Subject",
                "Priority",
                "Agent",
                "Status",
                "Created Time",
                "Actions",
              ].map((head) => (
                <th key={head} className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-5 py-4 text-sm font-bold text-slate-900">#{ticket.id}</td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">{ticket.customer_name}</td>
                <td className="min-w-[260px] px-5 py-4 text-sm font-medium text-slate-800">{ticket.subject}</td>
                <td className="whitespace-nowrap px-5 py-4"><PriorityBadge priority={ticket.priority} /></td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">{ticket.assigned_agent}</td>
                <td className="whitespace-nowrap px-5 py-4"><StatusBadge status={ticket.status} /></td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">{formatDateTime(ticket.created_at)}</td>
                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center gap-2">
                    <select
                      value={ticket.status}
                      disabled={updatingId === ticket.id}
                      onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 disabled:opacity-60"
                    >
                      {statuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                    <button
                      onClick={() => onView(ticket.id)}
                      className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-100 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;
