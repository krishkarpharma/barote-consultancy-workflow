import { formatDate, isDeadlineUrgent, isOverdue } from "../utils";

interface Props {
  ns?: bigint | null;
  isDeadline?: boolean;
  fallback?: string;
  className?: string;
}

export function DateDisplay({
  ns,
  isDeadline = false,
  fallback = "—",
  className = "",
}: Props) {
  const urgent = isDeadline && isDeadlineUrgent(ns);
  const overdue = isDeadline && isOverdue(ns);

  const colorClass = overdue
    ? "text-destructive font-semibold"
    : urgent
      ? "text-destructive font-medium"
      : "text-foreground";

  return (
    <span
      className={`${colorClass} ${className}`}
      title={urgent ? "Due within 7 days" : undefined}
    >
      {formatDate(ns, fallback)}
      {urgent && !overdue && (
        <span className="ml-1 text-xs bg-destructive/15 text-destructive px-1 py-0.5 rounded">
          Soon
        </span>
      )}
      {overdue && (
        <span className="ml-1 text-xs bg-destructive/15 text-destructive px-1 py-0.5 rounded">
          Overdue
        </span>
      )}
    </span>
  );
}
