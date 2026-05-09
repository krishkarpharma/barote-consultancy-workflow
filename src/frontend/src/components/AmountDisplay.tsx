import { formatCurrency } from "../utils";

interface Props {
  amount: bigint | number;
  highlight?: "pending" | "collected" | "none";
  className?: string;
}

export function AmountDisplay({
  amount,
  highlight = "none",
  className = "",
}: Props) {
  const colorClass =
    highlight === "pending"
      ? "text-accent font-semibold"
      : highlight === "collected"
        ? "text-chart-4 font-semibold"
        : "text-foreground";

  return (
    <span className={`${colorClass} ${className}`}>
      {formatCurrency(amount)}
    </span>
  );
}
