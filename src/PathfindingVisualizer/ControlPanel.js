import React from 'react'
import {BsFillPlayFill} from 'react-icons/bs'
import {GrPowerReset} from 'react-icons/gr'
import {GiMaze} from 'react-icons/gi'

const ControlPanel = ( {run, reset, generate} ) => {
  return (
    <div>
        <BsFillPlayFill className="icon" style={{color: 'green'}} onClick={run}/>
        <GrPowerReset className="icon" style={{color: 'red'}} onClick={reset}/>
        <GiMaze className="icon" style={{color: 'black'}} onClick={generate}/>
    </div>
  )
}

export default ControlPanel