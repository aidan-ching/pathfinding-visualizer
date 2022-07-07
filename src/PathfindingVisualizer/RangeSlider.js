import React from 'react'

const RangeSlider = () => {
  return (
    <div class="slidecontainer">
        <div>Animation Speed</div>
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
    </div>
  )
}

export default RangeSlider