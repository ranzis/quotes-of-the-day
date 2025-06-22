import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QuotesPage from "./QuotesPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuotesPage />
    </QueryClientProvider>
  );
}
