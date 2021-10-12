import React, { useEffect, useState } from "react";
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
  let isPlayer = true; // T - player first | F - AI first
  const [difficulty, setDifficulty] = useState(difficulties[0]);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [tie, setTie] = useState(0);

  const to2DArray = (inputArray) => {
    let output = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    output[0][0] = inputArray[0];
    output[0][1] = inputArray[1];
    output[0][2] = inputArray[2];
    output[1][0] = inputArray[3];
    output[1][1] = inputArray[4];
    output[1][2] = inputArray[5];
    output[2][0] = inputArray[6];
    output[2][1] = inputArray[7];
    output[2][2] = inputArray[8];

    return output;
  };

  const to1DArray = (inputMatrix) => {
    let output = Array(9).fill(0);

    output[0] = inputMatrix[0][0];
    output[1] = inputMatrix[0][1];
    output[2] = inputMatrix[0][2];
    output[3] = inputMatrix[1][0];
    output[4] = inputMatrix[1][1];
    output[5] = inputMatrix[1][2];
    output[6] = inputMatrix[2][0];
    output[7] = inputMatrix[2][1];
    output[8] = inputMatrix[2][2];
  };

  const to1DCoord = (i, j) => {
    if (i === 0 && j === 0) return 0;
    if (i === 0 && j === 1) return 1;
    if (i === 0 && j === 2) return 2;
    if (i === 1 && j === 0) return 3;
    if (i === 1 && j === 1) return 4;
    if (i === 1 && j === 2) return 5;
    if (i === 2 && j === 0) return 6;
    if (i === 2 && j === 1) return 7;
    if (i === 2 && j === 2) return 8;
  };

  const exists = (arr, value) => {
    return arr.some((row) => row.includes(value));
  };

  const getBestMove = (inputMatrix) => {
    let bestScore = Infinity;
    let bestPosition = Array(2).fill(0);

    // Look for best move
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (inputMatrix[i][j] === 0) {
          inputMatrix[i][j] = -1; // Place O
          let score = alfaBeta(
            inputMatrix,
            difficulty[0],
            -Infinity,
            Infinity,
            true
          );
          inputMatrix[i][j] = 0;
          if (score < bestScore) {
            bestScore = score;
            bestPosition[0] = i;
            bestPosition[1] = j;
          }
        }
      }
    }

    // AI moves
    if (getWinner(inputMatrix) === 0 && getWinner(inputMatrix) !== 1) {
      handleMove(to1DCoord(bestPosition[0], bestPosition[1]));
    }
  };

  const alfaBeta = (input, depth, alpha, beta, player) => {
    let bestScore = null;
    let score = null;

    if (depth === 0 || getWinner(input) !== 0) return getWinner(input);

    if (player) {
      // Player makes move
      bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Free spot
          if (input[i][j] === 0) {
            input[i][j] = 1; // X move
            score = alfaBeta(input, depth - 1, alpha, beta, false);
            input[i][j] = 0; // Reset move
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
          }
        }
      }
      return bestScore;
    } else {
      // AI makes move
      bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Free spot
          if (input[i][j] === 0) {
            input[i][j] = -1; // O move
            score = alfaBeta(input, depth - 1, alpha, beta, true);
            input[i][j] = 0; // Reset board
            bestScore = Math.min(score, bestScore);
            alpha = Math.min(beta, score);
            if (beta <= alpha) break;
          }
        }
      }
      return bestScore;
    }
  };

  const getWinner = (matrix) => {
    /*
    Player wins: 1
    AI wins: -1
    Tie: 2
    No winner yet: 0
    */

    // Horizontal and Vertical
    for (let i = 0; i < 3; i++) {
      if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2])
        return matrix[i][1];

      if (matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i])
        return matrix[1][i];
    }

    // Diagonal
    if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2])
      return matrix[1][1];

    // Inverse Diagonal
    if (matrix[2][0] === matrix[1][1] && matrix[1][1] === matrix[0][2])
      return matrix[1][1];

    // Tie
    if (!exists(matrix, 0)) return 2;

    return 0;
  };

  const handleMove = (i) => {
    const boardCopy = [...board];

    // Player move
    if (isPlayer) {
      if (boardCopy[i] || getWinner(to2DArray(logicArray)) !== 0) return;
      boardCopy[i] = CloseIcon;
      logicArray[i] = 1;
      setBoard(boardCopy);
      isPlayer = false;
      getBestMove(to2DArray(logicArray));
    }
    // AI move
    else {
      if (boardCopy[i] || getWinner(to2DArray(logicArray)) !== 0) return;
      boardCopy[i] = CircleOutlinedIcon;
      logicArray[i] = -1;
      setBoard(boardCopy);
      isPlayer = true;
    }

    if (getWinner(to2DArray(logicArray)) !== 0) {
      if (getWinner(to2DArray(logicArray)) === 1) {
        setPlayerScore(playerScore + 1);
      }
      if (getWinner(to2DArray(logicArray)) === -1) setAiScore(aiScore + 1);
      if (getWinner(to2DArray(logicArray)) === 2) setTie(tie + 1);
      return;
    }

    return;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setLogicArray(Array(9).fill(0));
    isPlayer = true;
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
            sx={{ width: 230 }}
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
      <Typography>Player Wins: {playerScore}</Typography>
      <Typography>AI Wins: {aiScore}</Typography>
      <Typography>Tie: {tie}</Typography>
      <Typography>Player: {isPlayer.toString()}</Typography>
    </div>
  );
}

export default App;
