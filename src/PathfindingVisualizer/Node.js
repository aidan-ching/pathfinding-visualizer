import React from "react";

const Node = ({ text, x, y, start, end, discovered }) => {
  return (
    <div
      className="node"
      style={{ backgroundColor: start ? "green" : end ? "red" : discovered ? "lightblue" : "white" }}
    >
      {text}
    </div>
  );
};

export default Node;
