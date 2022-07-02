import React from "react";
import Grid from "./Grid";
import ItemSelector from "./ItemSelector";
import ControlPanel from "./ControlPanel";
import { useState } from "react";
import * as algo from "../algorithms/dijkstra";
import * as maze_gen from "../algorithms/maze_gen"

const Pathfinding = () => {
  const [rows, setRows] = useState(71);
  const [cols, setCols] = useState(47);
  const [grid, setGrid] = useState(new algo.Grid(rows, cols).grid);
  const [start, setStart] = useState([-1, -1]); // x, y
  const [finish, setFinish] = useState([-1, -1]);
  const [itemToPlace, setItemToPlace] = useState(undefined);
  const [mouseDown, setMouseDown] = useState(false);

  const animationTime = 5;

  const generate = () =>{
    setGrid(maze_gen.recursive_backtracking(new algo.Grid(rows,cols).grid));
  };

  const run = () => {
    //no start or end chosen
    if (start === [-1, -1] || finish === [-1, -1]) {
      console.log("Error: No start or/and end chosen");
    } else {

      let tempStart = start;
      let tempFinish = finish;

      reset();

      setStart(tempStart);
      setFinish(tempFinish);

      
      let result = algo.dijkstra_endgoal(clearDiscovered(grid), tempStart, tempFinish);

      

      //animate the discovered path first
      for (let i = 0; i < result[1].length; ++i) {
        setTimeout(() => {
          let newGrid = grid.slice();
          newGrid[result[1][i].x][result[1][i].y].explored = true;
          setGrid(newGrid);
        }, animationTime * i + animationTime);
      }

      //now animate the actual path found
      for (let i = 0; i < result[0].length; ++i) {
        setTimeout(() => {
          let newGrid = grid.slice();
          newGrid[result[0][i].x][result[0][i].y].path = true;
          setGrid(newGrid);
        }, (animationTime * i * 2) + animationTime * result[1].length);
      }
    }
  };

  const reset = () => {
    setGrid(new algo.Grid(rows, cols).grid);
    setStart([-1, -1]);
    setFinish([-1, -1]);
  };

  const changeItemToPlace = (e) => {
    setItemToPlace(e.target.innerText);
  };

  const clearDiscovered = () => {
    let newGrid = new algo.Grid(rows, cols).grid;

    for (let i = 0; i < newGrid.length; ++i) {
      for (let j = 0; j < newGrid[i].length; ++j) {
        if (grid[i][j].wall) {
          newGrid[i][j].wall = true;
        }
      }
    }

    return newGrid;
  };

  const changeGrid = (x, y) => {
    if (itemToPlace === "BEGIN") {
      setGrid(clearDiscovered(grid));
      setStart([x, y]);
    } else if (itemToPlace === "END") {
      setGrid(clearDiscovered(grid));
      setFinish([x, y]);
    } else if (itemToPlace === "WALL") {
      let newGrid = clearDiscovered(grid);
      newGrid[x][y].wall = true;
      setGrid(newGrid);
    }
  };

  const handleMouseDown = (x, y) => {
    setMouseDown(true);
    changeGrid(x, y);
  };

  const handleMouseEnter = (x, y) => {
    if (!mouseDown) return;
    changeGrid(x, y);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
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
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
          handleMouseUp={handleMouseUp}
        />
      </div>

      <div className="btn-container">
        <ControlPanel run={run} reset={reset} generate={generate}/>
          
        <ItemSelector changeItemToPlace={changeItemToPlace} itemToPlace={itemToPlace}/>

      </div>
    </div>
  );
};

export default Pathfinding;
