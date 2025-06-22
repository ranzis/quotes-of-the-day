import { useState } from "react";
import { Container, Box } from "@mui/material";
import { useQuotes } from "./hooks/useQuotes";
import { QuotesHeader } from "./components/QuotesHeader";
import { QuotesForm } from "./components/QuotesForm";
import { QuotesResults } from "./components/QuotesResults";

export default function QuotesPage() {
  const [amount, setAmount] = useState(1);
  const [tag, setTag] = useState("");
  const [submitted, setSubmitted] = useState<null | {
    amount: number;
    tag: string;
  }>(null);

  const { data, isLoading, isError, error, isFetching } = useQuotes(
    submitted?.amount ?? 1,
    submitted?.tag ?? "",
    !!submitted
  );

  const handleGetQuotes = () => setSubmitted({ amount, tag });
  const handleClear = () => {
    setSubmitted(null);
    setAmount(1);
    setTag("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#f5f7fb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 6,
      }}
    >
      <QuotesHeader />
      <Container
        maxWidth="lg"
        sx={{
          bgcolor: "#f5f7fb",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          mb: 2,
        }}
      >
        <QuotesForm
          amount={amount}
          tag={tag}
          setAmount={setAmount}
          setTag={setTag}
          onSubmit={handleGetQuotes}
          onClear={handleClear}
          isFetching={isFetching}
          submitted={!!submitted}
        />
      </Container>
      <QuotesResults
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        submitted={!!submitted}
        data={data}
      />
    </Box>
  );
}
