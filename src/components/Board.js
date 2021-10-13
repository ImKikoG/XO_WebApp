import React from "react";
import Square from "./Square";
import { Grid } from "@mui/material";

export default function Board({ squares, onClick }) {
  return (
    <div>
      <Grid sx={{ maxWidth: 600, minWidth: 600, margin: "auto" }}>
        {squares.map((square, i) => (
          <Square key={i} symbol={square} onClick={() => onClick(i)}></Square>
        ))}
      </Grid>
    </div>
  );
}
