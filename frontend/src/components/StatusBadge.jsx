import React from "react";
const styles = {
  Open: "bg-blue-100 text-blue-700 border-blue-200",
  "In Progress": "bg-amber-100 text-amber-700 border-amber-200",
  Escalated: "bg-red-100 text-red-700 border-red-200",
  Resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles[status] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
