import React from "react";

const Node = ({ text, x, y, start, end, discovered, path, changeGrid, wall }) => {
  return (
    <div
      className="node"
      style={{ backgroundColor: start ? "DarkGreen" : end ? "FireBrick" : wall ? "black" : path ? "#6495ED" : discovered ? "lightblue" : "white"}}
      onClickCapture={() => {changeGrid(x,y)}}
    >
      {text}
    </div>
  );
};

export default Node;
