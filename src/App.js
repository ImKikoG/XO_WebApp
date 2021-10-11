import React, { useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Board from "./components/Board";

const difficulties = [
  "1 - Super Easy",
  "2 - Very Easy",
  "3 - Easy",
  "4 - Normal",
  "5 - Kinda Hard",
  "6 - Hard",
  "7 - Very Hard",
  "8 - Super Hard",
  "9 - Impossible",
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayer, setIsPlayer] = useState(true);
  const [difficulty, setDifficulty] = useState(difficulties[0]);

  const getWinner = () => {
    return false;
  };

  const winner = getWinner(board);

  const handleClick = (i) => {
    const boardCopy = [...board];

    // If square occupied or game over, return
    if (winner || boardCopy[i]) return;

    boardCopy[i] = isPlayer ? CloseIcon : CircleOutlinedIcon;
    setBoard(boardCopy);
    setIsPlayer(!isPlayer);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsPlayer(true);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{ maxWidth: 800, minWidth: 600, margin: "auto", marginBottom: 5 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TIC-TAC-TOE
          </Typography>
          <Autocomplete
            value={difficulty}
            onChange={(event, newValue) => {
              setDifficulty(newValue);
            }}
            options={difficulties}
            size="small"
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Difficulty" />
            )}
          ></Autocomplete>
          <Button color="inherit" onClick={handleReset} sx={{ margin: 1 }}>
            Reset Game
          </Button>
        </Toolbar>
      </AppBar>
      <Board squares={board} onClick={handleClick} />
    </div>
  );
}

export default App;
