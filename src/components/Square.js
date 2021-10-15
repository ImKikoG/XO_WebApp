import React, { useState, useEffect } from "react";
import { Button, Icon } from "@mui/material";
import Zoom from "@mui/material/Zoom";

export default function Square({ symbol, onClick }) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (symbol !== null) setClicked(true);
    else setClicked(false);
  }, [symbol]);

  return (
    <Button
      variant="outlined"
      sx={{ width: 200, height: 200 }}
      onClick={onClick}
    >
      <Zoom in={clicked}>
        <Icon sx={{ fontSize: 100 }} component={symbol} />
      </Zoom>
    </Button>
  );
}
