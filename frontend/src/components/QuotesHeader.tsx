import { Typography, Box } from "@mui/material";
import { getILDateStr } from "../utils/utils";

export function QuotesHeader() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          position: "absolute",
          top: 24,
          left: 0,
          px: 6,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: "#757575",
            fontWeight: 400,
            fontSize: "1.1rem",
            minWidth: 92,
          }}
        >
          {getILDateStr()}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mb: 6,
          direction: "rtl",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#1976d2",
            textAlign: "center",
            letterSpacing: 1,
            textShadow: "0 2px 8px rgba(25,118,210,0.06)",
            mb: 0,
          }}
        >
          Quotes Of The Day
        </Typography>
      </Box>
    </>
  );
}
