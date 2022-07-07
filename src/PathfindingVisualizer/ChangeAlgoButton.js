import React from 'react'

const ChangeAlgoButton = ({text, run}) => {
  return (
    <div className="toggleChangeAlgo" onClick={run}>{text}</div>
  )
}

export default ChangeAlgoButton