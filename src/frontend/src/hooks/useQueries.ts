import { useQuery } from "@tanstack/react-query";
import type { DashboardStats } from "../types";
import { useBackend } from "./useBackend";

export function useGetDashboardStats() {
  const { getDashboardStats } = useBackend();
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    refetchInterval: 60_000,
  });
}
