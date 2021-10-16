import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";

import Board from "./components/Board";
import {
  ThemeProvider,
  createTheme,
  Switch,
  CssBaseline,
  Box,
  Button,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import { Icon } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [logicArray, setLogicArray] = useState(Array(9).fill(0));
  const [isPlayer, setIsPlayer] = useState(true); // T - player first | F - AI first
  const [difficulty, setDifficulty] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [tie, setTie] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [playerWin, setPlayerWin] = useState(false);
  const [aiWin, setAiWin] = useState(false);
  const [tieGame, setTieGame] = useState(false);

  useEffect(() => {
    setMenuVisible(true);
    setResultVisible(false);
    setPlayerWin(false);
    setAiWin(false);
    setTieGame(false);
  }, []);

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

  const getIndex = (i, j) => {
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
          inputMatrix[i][j] = 0; // Remove O
          if (score < bestScore) {
            bestScore = score;
            bestPosition[0] = i;
            bestPosition[1] = j;
          }
        }
      }
    }

    // AI makes best available move
    if (getWinner(inputMatrix) === 0 && getWinner(inputMatrix) !== 1) {
      return getIndex(bestPosition[0], bestPosition[1]);
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
            input[i][j] = 1; // Place X
            score = alfaBeta(input, depth - 1, alpha, beta, false);
            input[i][j] = 0; // Remove X
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
            input[i][j] = -1; // Place O
            score = alfaBeta(input, depth - 1, alpha, beta, true);
            input[i][j] = 0; // Remove O
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

    if (logicArray[i] || getWinner(to2DArray(logicArray)) !== 0) return;

    // Player move
    if (isPlayer) {
      if (logicArray[i] || getWinner(to2DArray(logicArray)) !== 0) return;
      boardCopy[i] = CloseIcon;
      logicArray[i] = 1;
      setIsPlayer(!isPlayer);
      setBoard([...boardCopy]);
      console.log("Player made move!");
    }
    // // AI move
    // else {
    //   let j = getBestMove(to2DArray(logicArray));
    //   if (logicArray[j] || getWinner(to2DArray(logicArray)) !== 0) return;
    //   boardCopy[j] = CircleOutlinedIcon;
    //   logicArray[j] = -1;
    //   setIsPlayer(!isPlayer);
    //   setBoard([...boardCopy]);
    //   console.log("AI made move!");
    // }

    // Check if there is a winner
    if (getWinner(to2DArray(logicArray)) !== 0) {
      if (getWinner(to2DArray(logicArray)) === 1) {
        setPlayerWin(true);
        setPlayerScore(playerScore + 1);
        setResultVisible(true);
      }
      if (getWinner(to2DArray(logicArray)) === -1) {
        setAiWin(true);
        setAiScore(aiScore + 1);
        setResultVisible(true);
      }
      if (getWinner(to2DArray(logicArray)) === 2) {
        setTieGame(true);
        setTie(tie + 1);
        setResultVisible(true);
      }
      return;
    }
  };

  const handleAiMove = () => {
    const boardCopy = [...board];
    let i = getBestMove(to2DArray(logicArray));
    if (logicArray[i] || getWinner(to2DArray(logicArray)) !== 0) return;
    boardCopy[i] = CircleOutlinedIcon;
    logicArray[i] = -1;
    setIsPlayer(!isPlayer);
    setBoard([...boardCopy]);
    console.log("AI made move!");

    // Check if there is a winner
    if (getWinner(to2DArray(logicArray)) !== 0) {
      if (getWinner(to2DArray(logicArray)) === 1) {
        setPlayerWin(true);
        setPlayerScore(playerScore + 1);
        setResultVisible(true);
      }
      if (getWinner(to2DArray(logicArray)) === -1) {
        setAiWin(true);
        setAiScore(aiScore + 1);
        setResultVisible(true);
      }
      if (getWinner(to2DArray(logicArray)) === 2) {
        setTieGame(true);
        setTie(tie + 1);
        setResultVisible(true);
      }
      return;
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setLogicArray(Array(9).fill(0));
    setIsPlayer(true);
  };

  const handleContinue = () => {
    setPlayerWin(false);
    setAiWin(false);
    setTieGame(false);
    setResultVisible(false);
    handleReset();
  };

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#FCF8EC",
      },
      primary: {
        main: "#456268",
      },
      secondary: {
        main: "#D0E8F2",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#1B262C",
      },
      primary: {
        main: "#46B5D1",
      },
      secondary: {
        main: "#204051",
      },
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{ minWidth: 800, margin: "auto", marginBottom: 5 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TIC-TAC-TOE
          </Typography>
          <Icon component={darkMode ? Brightness4Icon : Brightness7Icon} />
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            color="secondary"
          />
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          maxWidth: 1500,
        }}
      >
        <div style={{ width: "70%" }}>
          <Board squares={board} onClick={handleMove} />
        </div>
        <div style={{ width: "30%" }}>
          <ScoreBoard
            handleReset={handleReset}
            setDiff={setDifficulty}
            isPlayer={isPlayer}
            handleAiMove={handleAiMove}
            playerScore={playerScore}
            aiScore={aiScore}
            tie={tie}
          />
        </div>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={menuVisible}
      >
        <Stack spacing={2} alignItems="center" justifyContent="flex-start">
          <Typography variant="h2" sx={{ marginBottom: 5 }}>
            WELCOME TO TIC-TAC-TOE
          </Typography>
          <Button
            sx={{ width: 200 }}
            variant="contained"
            onClick={() => setMenuVisible(false)}
          >
            LOGIN
          </Button>
          <Button
            sx={{ width: 200 }}
            variant="contained"
            onClick={() => setMenuVisible(false)}
          >
            REGISTER
          </Button>
          <Button
            sx={{ width: 200 }}
            variant="contained"
            onClick={() => setMenuVisible(false)}
          >
            PLAY AS GUEST
          </Button>
        </Stack>
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={resultVisible}
      >
        <Stack spacing={2} alignItems="center" justifyContent="flex-start">
          {playerWin && <Typography variant="h1">YOU WIN</Typography>}
          {aiWin && <Typography variant="h1">YOU LOSE</Typography>}
          {tieGame && <Typography variant="h1">TIE</Typography>}
          <Button color="primary" variant="contained" onClick={handleContinue}>
            CONTINUE
          </Button>
        </Stack>
      </Backdrop>
    </ThemeProvider>
  );
}

export default App;
