import React from "react";
import Grid from "./Grid";
import Button from "./Button";
import RadioButtons from "./RadioButtons";
import { useState } from "react";
import * as algo from "../algorithms/dijkstra";

const Pathfinding = () => {
  const [rows, setRows] = useState(80);
  const [cols, setCols] = useState(30);
  const [grid, setGrid] = useState(new algo.Grid(rows, cols).grid);
  const [start, setStart] = useState([-1, -1]); // x, y
  const [finish, setFinish] = useState([-1, -1]);
  const [itemToPlace, setItemToPlace] = useState(undefined);

  const run = () => {
    let newGrid = algo.dijkstra_endgoal(grid, start, finish);
    let tempNode = newGrid[finish[0]][finish[1]];
    while (tempNode.prev !== undefined) {
      tempNode = tempNode.prev;
      newGrid[tempNode.x][tempNode.y].path = true;
    }

    setGrid(newGrid);
  };

  const reset = () => {
    setGrid(new algo.Grid(rows, cols).grid);
    setStart([-1, -1]);
    setFinish([-1, -1]);
  };

  const changeItemToPlace = (e) => {
    setItemToPlace(e.target.id);
  };

  const clearDiscovered = () => {
    let newGrid = new algo.Grid(rows,cols).grid;

    for (let i = 0; i < newGrid.length; ++i){
      for (let j = 0; j < newGrid[i].length; ++j){
        if (grid[i][j].wall){
          newGrid[i][j].wall = true;
        }
      }
    }

    return newGrid;
  };

  const changeGrid = (x, y) => {
    if (itemToPlace === "start") {
      setGrid(clearDiscovered(grid));
      setStart([x, y]);
    } else if (itemToPlace === "stop") {
      setGrid(clearDiscovered(grid));
      setFinish([x, y]);
    } else if (itemToPlace === "wall") {
      let newGrid = JSON.parse(JSON.stringify(grid));
      newGrid[x][y].wall = true;
      setGrid(newGrid);
    }

    console.log(grid[x][y]);
  };

  return (
    <div className="wrapper">
      <div className="grid_setup">
        <Grid
          start={start}
          finish={finish}
          rows={rows}
          cols={cols}
          grid={grid}
          changeGrid={changeGrid}
        />
        <RadioButtons onChange={changeItemToPlace} />
      </div>

      <div className="btn-container">
        <Button text="Run" onClick={run} />
        <Button text="Reset" onClick={reset} />
      </div>
    </div>
  );
};

export default Pathfinding;
