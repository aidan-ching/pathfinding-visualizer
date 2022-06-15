import React from "react";

const RadioButtons = ({ onChange }) => {
  return (
    <div className="radio_buttons">
      <label>
        <input type="radio" name="select" id="start" onClick={onChange}/>
        Start
      </label>

      <label>
        <input type="radio" name="select" id="stop" onClick={onChange}/>
        Stop
      </label>

      <label>
        <input type="radio" name="select" id="wall" onClick={onChange}/>
        Wall
      </label>
    </div>
  );
};

export default RadioButtons;
