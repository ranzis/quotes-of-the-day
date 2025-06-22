import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Quote } from "../../../backend/src/types/quotes";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export const QuoteCard = React.memo(function QuoteCard({
  quote,
  style,
}: {
  quote: Quote;
  style?: React.CSSProperties;
}) {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 6 },
      }}
      style={style}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          p: 3,
        }}
      >
        {/* ציטוט גדול עם אייקון */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1 }}
          >
            <FormatQuoteIcon
              fontSize="large"
              sx={{ color: "#1976d2", mt: 0.2 }}
            />
            <Typography
              variant="h6"
              component="blockquote"
              sx={{
                fontStyle: "italic",
                m: 0,
                p: 0,
                lineHeight: 1.5,
                color: "#222",
                textAlign: "left",
                fontWeight: 400,
              }}
            >
              {`"${quote.body}"`}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{
            mt: 2,
            mb: 1,
            fontWeight: 700,
            color: "#666",
            textAlign: "left",
          }}
        >
          - {quote.author}
        </Typography>

        <Box sx={{ mt: "auto", display: "flex", gap: 1, flexWrap: "wrap" }}>
          {(quote.tags || []).map((tag: string) => (
            <Typography
              key={tag}
              sx={{
                fontSize: "0.9em",
                color: "#1976d2",
                mr: 1,
                userSelect: "text",
                textAlign: "left",
              }}
            >
              #{tag}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
});
