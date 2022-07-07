import React from 'react'
import ChangeAlgoButton from './ChangeAlgoButton'

const ChangeAlgoMenu = ({text, run, change}) => {
  return (
    <div className='changeAlgoMenu'>
        <ChangeAlgoButton text={text} run={run}/>
        <div className='changeAlgoOption' onClick={change}>Dijkstra's</div>
        <div className='changeAlgoOption' onClick={change}>BFS</div>
        <div className='changeAlgoOption' onClick={change}>DFS</div>
    </div>
  )
}

export default ChangeAlgoMenu