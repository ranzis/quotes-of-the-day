import { Typography, CircularProgress } from "@mui/material";
import { QuoteList } from "./QuoteList";
import { Quote } from "../../../backend/src/types/quotes";

type Props = {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: any;
  submitted: boolean;
  data: Quote[] | undefined;
};

export function QuotesResults({
  isLoading,
  isFetching,
  isError,
  error,
  submitted,
  data,
}: Props) {
  if (isLoading || isFetching) return <CircularProgress sx={{ mt: 6 }} />;
  if (isError)
    return (
      <Typography color="error" sx={{ mt: 6 }}>
        {error?.message || "Error"}
      </Typography>
    );
  if (submitted && data && data.length > 0) return <QuoteList quotes={data} />;
  if (submitted)
    return (
      <Typography
        sx={{
          mt: 5,
          color: "text.secondary",
          fontWeight: 500,
          letterSpacing: 1,
          fontSize: "1.2rem",
          textAlign: "center",
        }}
      >
        No quotes found for this tag.
      </Typography>
    );
  return null;
}
