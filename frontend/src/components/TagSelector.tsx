import { TextField } from "@mui/material";

export function TagSelector({
  value,
  onChange,
  sx = {},
}: {
  value: string;
  onChange: (val: string) => void;
  sx?: object;
}) {
  return (
    <TextField
      label="Tag (Optional)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="medium"
      sx={{
        borderRadius: 2,
        bgcolor: "white",
        boxShadow: 1,
        ...sx,
      }}
      InputProps={{
        inputProps: { min: 1, max: 50 },
        sx: { borderRadius: 2 },
      }}
    />
  );
}
