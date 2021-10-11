import React, { useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Icon, Table } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const difficulty = [
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
  const [value, setValue] = useState(difficulty[0]);

  return (
    <div>
      <AppBar
        position="static"
        sx={{ maxWidth: 800, margin: "auto", marginBottom: 5 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            XO GAME
          </Typography>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            options={difficulty}
            size="small"
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Difficulty" />
            )}
          ></Autocomplete>
          <Button color="inherit">Start</Button>
        </Toolbar>
      </AppBar>
      <Table sx={{ maxWidth: 600, margin: "auto" }}>
        <tbody>
          <tr>
            <td>
              <Button variant="outlined" sx={{ width: 200, height: 200 }}>
                <Icon sx={{ fontSize: 100 }} component={CloseIcon} />
              </Button>
            </td>
            <td>
              <Button variant="outlined" sx={{ width: 200, height: 200 }}>
                <Icon sx={{ fontSize: 100 }} component={CircleOutlinedIcon} />
              </Button>
            </td>
            <td>
              <Button variant="outlined" sx={{ width: 200, height: 200 }}>
                <Icon sx={{ fontSize: 100 }} component={CloseIcon} />
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="outlined" sx={{ width: 200, height: 200 }}>
                <Icon sx={{ fontSize: 100 }} component={CircleOutlinedIcon} />
              </Button>
            </td>
            <td>
              <Button variant="outlined" sx={{ width: 200, height: 200 }}>
                <Icon sx={{ fontSize: 100 }} component={CloseIcon} />
              </Button>
            </td>
            <td>
              <Button variant="outlined" sx={{ width: 200, height: 200 }}>
                <Icon sx={{ fontSize: 100 }} component={CircleOutlinedIcon} />
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="outlined" sx={{ width: 200, height: 200 }}>
                <Icon sx={{ fontSize: 100 }} component={CloseIcon} />
              </Button>
            </td>
            <td>
              <Button variant="outlined" sx={{ width: 200, height: 200 }}>
                <Icon sx={{ fontSize: 100 }} component={CloseIcon} />
              </Button>
            </td>
            <td>
              <Button variant="outlined" sx={{ width: 200, height: 200 }}>
                <Icon sx={{ fontSize: 100 }} component={CircleOutlinedIcon} />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default App;
