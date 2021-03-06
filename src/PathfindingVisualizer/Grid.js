import React from "react";
import Node from "./Node";

const Grid = ({
  start,
  finish,
  rows,
  cols,
  grid,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}) => {
  const generateGrid = () => {
    let myGrid = [];
    let count = 1;

    for (let col = 0; col < cols; col++) {
      //how high the grid is
      for (let row = 0; row < rows; row++) {
        //how wide the grid is
        myGrid.push(
          <Node
            key={count}
            x={row}
            y={col}
            start={row === start[0] && col === start[1] ? true : false}
            end={row === finish[0] && col === finish[1] ? true : false}
            discovered={grid[row][col].explored}
            path={grid[row][col].path}
            wall={grid[row][col].wall}
            gray={(row+col)%2 === 0 ? true: false}
            handleMouseDown={handleMouseDown}
            handleMouseEnter={handleMouseEnter}
            handleMouseUp={handleMouseUp}
          />
        );
        ++count;
      }
    }

    return myGrid;
  };

  return <div className="grid">{generateGrid()}</div>;
};


//use generateGrid to create our array of Nodes, then just return that array of Nodes within a large grid. This makes our grid asset. 
export default Grid;
