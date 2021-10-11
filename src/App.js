import React, { useState, useEffect } from "react";
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
  const [logicArray, setLogicArray] = useState(Array(9).fill(0));
  const [isPlayer, setIsPlayer] = useState(true);
  const [difficulty, setDifficulty] = useState(difficulties[0]);

  const to2DArray = (array) => {
    var output = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    output[0][0] = array[0];
    output[0][1] = array[1];
    output[0][2] = array[2];
    output[1][0] = array[3];
    output[1][1] = array[4];
    output[1][2] = array[5];
    output[2][0] = array[6];
    output[2][1] = array[7];
    output[2][2] = array[8];

    return output;
  };

  const exists = (arr, value) => {
    return arr.some((row) => row.includes(value));
  };

  const getWinner = (arrayInput) => {
    /*
    Player wins: 1
    AI wins: -1
    Tie: 2
    No winner yet: 0
    */

    // Convert input to 2D array for easier win condition check
    var matrix = to2DArray(arrayInput);

    // Tie
    if (!exists(matrix, 0)) return 2;

    // Horizontal
    for (var row = 0; row < 3; row++) {
      if (
        matrix[row][0] === matrix[row][1] &&
        matrix[row][1] === matrix[row][2]
      )
        return matrix[row][1];
    }

    // Vertical
    for (var col = 0; col < 3; col++) {
      if (
        matrix[0][col] === matrix[1][col] &&
        matrix[1][col] === matrix[2][col]
      )
        return matrix[1][col];
    }

    // Diagonal
    if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2])
      return matrix[1][1];

    // Inverse Diagonal
    if (matrix[2][0] === matrix[1][1] && matrix[1][1] === matrix[0][2])
      return matrix[1][1];

    return 0;
  };

  const winner = getWinner(logicArray);

  const handleMove = (i) => {
    const boardCopy = [...board];

    // GAME OVER
    if (winner !== 0) {
      console.log("Game Over!");
      return;
    }

    // If square occupied or game over, return
    if (winner || boardCopy[i]) return;

    // Display X or O
    boardCopy[i] = isPlayer ? CloseIcon : CircleOutlinedIcon;
    logicArray[i] = isPlayer ? 1 : -1;

    setBoard(boardCopy);
    setIsPlayer(!isPlayer);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setLogicArray(Array(9).fill(0));
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
      <Board squares={board} onClick={handleMove} />
    </div>
  );
}

export default App;
