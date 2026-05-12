import React from "react";
const styles = {
  Low: "bg-slate-100 text-slate-700",
  Medium: "bg-indigo-100 text-indigo-700",
  High: "bg-orange-100 text-orange-700",
  Critical: "bg-rose-100 text-rose-700",
};

const PriorityBadge = ({ priority }) => {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[priority] || "bg-slate-100 text-slate-700"}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;
