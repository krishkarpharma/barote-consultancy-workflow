import { AlertCircle, AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface Props {
  variant: "urgent" | "warning";
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
}

export function AlertBanner({
  variant,
  title,
  message,
  actionLabel,
  onAction,
  dismissible = false,
}: Props) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const isUrgent = variant === "urgent";
  const cls = isUrgent ? "alert-urgent" : "alert-warning";
  const Icon = isUrgent ? AlertCircle : AlertTriangle;
  const iconColor = isUrgent ? "text-destructive" : "text-accent";

  return (
    <div
      className={`${cls} rounded-lg p-4 flex items-start gap-3`}
      role="alert"
    >
      <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${iconColor}`} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{message}</p>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="mt-2 text-xs font-medium text-primary hover:underline"
          >
            {actionLabel}
          </button>
        )}
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
