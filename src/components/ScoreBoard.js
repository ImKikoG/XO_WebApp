import React, { useState } from "react";
import { List, Box, ListItem, Button, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { border } from "@mui/system";

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

export default function ScoreBoard({
  handleReset,
  setDiff,
  isPlayer,
  handleAiMove,
  playerScore,
  aiScore,
  tie,
}) {
  const [difficulty, setDifficulty] = useState(difficulties[0]);

  const handleChange = (value) => {
    setDifficulty(value);
    setDiff(value);
  };
  return (
    <Box
      sx={{
        maxWidth: 300,
        backgroundColor: "secondary.main",
        border: 2,
        borderColor: "primary.main",
        borderRadius: 2,
      }}
    >
      <List>
        <ListItem>
          <div style={{ width: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="difficulty-label">Difficulty</InputLabel>
              <Select
                labelId="difficulty-label"
                value={difficulty[0]}
                label="difficulty"
                onChange={(e) => handleChange(e.target.value)}
                sx={{
                  color: "primary.main",
                }}
              >
                {difficulties.map((difficulty) => (
                  <MenuItem key={difficulty[0]} value={difficulty[0]}>
                    {difficulty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </ListItem>
        <ListItem>
          <Button
            color="primary"
            onClick={() => handleReset()}
            sx={{ maxWidth: 150 }}
            variant="contained"
          >
            Reset Game
          </Button>
          {!isPlayer && (
            <Button
              sx={{ marginLeft: 1 }}
              color="primary"
              variant="contained"
              onClick={handleAiMove}
            >
              Get AI Move
            </Button>
          )}
        </ListItem>
        <ListItem>
          <Typography color="primary">Player score: {playerScore}</Typography>
        </ListItem>
        <ListItem>
          <Typography color="primary">AI score: {aiScore}</Typography>
        </ListItem>
        <ListItem>
          <Typography color="primary">Tie: {tie}</Typography>
        </ListItem>
      </List>
    </Box>
  );
}
