function getExpirationStatus(expirationDate, isCompleted) {
  if (isCompleted || !expirationDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(expirationDate + "T00:00:00");
  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "overdue";
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "tomorrow";
  return null;
}

const STATUS_BADGE = {
  overdue: {
    label: "Vencida",
    className: "bg-red-500/20 text-red-400 border border-red-500/30",
  },
  today: {
    label: "Vence hoje",
    className: "bg-red-500/20 text-red-400 border border-red-500/30",
  },
  tomorrow: {
    label: "Vence amanhã",
    className: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  },
};

export default function ExpirationBadge({ expirationDate, isCompleted }) {
  const status = getExpirationStatus(expirationDate, isCompleted);
  if (!status) return null;

  const { label, className } = STATUS_BADGE[status];

  return (
    <span
      className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${className}`}
    >
      {label}
    </span>
  );
}
