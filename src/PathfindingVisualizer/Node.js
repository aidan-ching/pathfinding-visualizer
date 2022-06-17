import React from "react";

const Node = ({
  text,
  x,
  y,
  start,
  end,
  discovered,
  path,
  wall,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}) => {
  return (
    <div
      className="node"
      style={{
        backgroundColor: start
          ? "DarkGreen"
          : end
          ? "FireBrick"
          : wall
          ? "black"
          : path
          ? "#6495ED"
          : discovered
          ? "lightblue"
          : "white",
      }}
      onMouseDown={() => {
        handleMouseDown(x, y);
      }}
      onMouseEnter={() => {
        handleMouseEnter(x, y);
      }}
      onMouseUp={() => {
        handleMouseUp();
      }}
    >
      {text}
    </div>
  );
};

export default Node;
