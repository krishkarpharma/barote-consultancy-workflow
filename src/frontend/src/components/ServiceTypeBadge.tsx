import type { ServiceType } from "../types";
import { getServiceTypeLabel } from "../utils";

interface Props {
  serviceType: ServiceType;
  className?: string;
}

const colors: Record<string, string> = {
  Drug: "bg-primary/10 text-primary",
  Food: "bg-chart-4/10 text-chart-4",
  GST: "bg-accent/10 text-accent",
  MSME: "bg-chart-5/10 text-chart-5",
  Other: "bg-muted text-muted-foreground",
};

function getColor(st: ServiceType): string {
  const label = getServiceTypeLabel(st);
  for (const [key, cls] of Object.entries(colors)) {
    if (label.includes(key)) return cls;
  }
  return colors.Other;
}

export function ServiceTypeBadge({ serviceType, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getColor(serviceType)} ${className}`}
    >
      {getServiceTypeLabel(serviceType)}
    </span>
  );
}
