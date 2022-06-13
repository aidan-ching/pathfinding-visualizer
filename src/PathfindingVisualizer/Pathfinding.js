import React from "react";
import Grid from "./Grid";
import Button from "./Button"
import { useState } from 'react';
import * as algo from '../algorithms/dijkstra'

const Pathfinding = () => {
  const [rows, setRows] = useState(80);
  const [cols, setCols] = useState(20);
  const [grid, setGrid] = useState(new algo.Grid(rows, cols).grid);
  const [start, setStart] = useState([5,10]);
  const [finish, setFinish] = useState([70,10])

  return (
    <div className="wrapper">
      <Grid start={start} finish={finish} rows = {rows} cols = {cols} grid = {grid}/>
      <div className="btn-container">
        <Button text = 'Start'/>
        <Button text = 'Clear'/>
      </div>

    </div>
  );
};

export default Pathfinding;
