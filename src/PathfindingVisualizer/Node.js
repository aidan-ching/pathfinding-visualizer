import React from "react";

const Node = ({ text, x, y, start, end }) => {
  return (
    <div
      className="node"
      style={{ backgroundColor: start ? "green" : end ? "red" : "white" }}
    >
      {text}
    </div>
  );
};

export default Node;
