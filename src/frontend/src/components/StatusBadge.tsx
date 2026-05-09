import type { ApplicationStatus } from "../types";
import { getStatusClass, getStatusLabel } from "../utils";

interface Props {
  status: ApplicationStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: Props) {
  return (
    <span className={`${getStatusClass(status)} ${className}`}>
      {getStatusLabel(status)}
    </span>
  );
}
