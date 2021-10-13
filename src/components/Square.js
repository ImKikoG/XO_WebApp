import React from "react";
import { Button, Icon } from "@mui/material";

export default function Square({ symbol, onClick }) {
  return (
    <Button
      variant="outlined"
      sx={{ width: 200, height: 200 }}
      onClick={onClick}
    >
      <Icon sx={{ fontSize: 100 }} component={symbol} />
    </Button>
  );
}
