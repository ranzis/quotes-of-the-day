import { useQuery } from "@tanstack/react-query";
import { fetchQuotes } from "../api/quotes";

export function useQuotes(amount: number, tag?: string, enabled = false) {
  return useQuery({
    queryKey: ["quotes", amount, tag],
    queryFn: () => fetchQuotes(amount, tag),
    staleTime: 1000 * 60,
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}