import Box from "@mui/material/Box";
import { Quote } from "../../../backend/src/types/quotes";
import { QuoteCard } from "./QuoteCard";

export function QuoteList({ quotes }: { quotes: Quote[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        },
        gap: 3,
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        mt: 1,
        mb: 3,
        alignItems: "stretch",
      }}
    >
      {quotes.map((q) => (
        <Box
          key={q.id}
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          <QuoteCard
            quote={q}
            style={{ flex: 1, width: "100%", height: "100%" }}
          />
        </Box>
      ))}
    </Box>
  );
}
