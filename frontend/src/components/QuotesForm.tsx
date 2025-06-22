import { TextField, Button, Box, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { TagSelector } from "./TagSelector";

type Props = {
  amount: number;
  tag: string;
  setAmount: (n: number) => void;
  setTag: (s: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  isFetching: boolean;
  submitted: boolean;
};

export function QuotesForm({
  amount,
  tag,
  setAmount,
  setTag,
  onSubmit,
  onClear,
  isFetching,
  submitted,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        mb: 1,
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <TextField
        label="Number of Quotes"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Math.max(1, Math.min(50, +e.target.value)))}
        size="medium"
        sx={{
          minWidth: 140,
          borderRadius: 2,
          bgcolor: "white",
          boxShadow: 1,
        }}
        InputProps={{ inputProps: { min: 1, max: 50 } }}
      />
      <TagSelector
        value={tag}
        onChange={setTag}
        sx={{
          minWidth: 160,
          borderRadius: 2,
          bgcolor: "white",
          boxShadow: 1,
        }}
      />
      <Button
        variant="contained"
        onClick={onSubmit}
        disabled={isFetching}
        size="large"
        sx={{
          borderRadius: 2,
          fontWeight: 700,
          px: 4,
          bgcolor: "#1976d2",
          boxShadow: 2,
          "&:hover": { bgcolor: "#115293" },
        }}
      >
        Get Quotes
      </Button>
      <Tooltip title="Clear Quotes">
        <span>
          <IconButton
            color="primary"
            onClick={onClear}
            disabled={!submitted}
            sx={{
              ml: 1,
              bgcolor: "#e3eafc",
              borderRadius: 2,
              "&:hover": { bgcolor: "#d2e1fa" },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}
