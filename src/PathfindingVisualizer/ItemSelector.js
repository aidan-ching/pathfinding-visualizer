import React from 'react'
import ItemSelectorBtn from './ItemSelectorBtn'

const ItemSelector = ({changeItemToPlace, itemToPlace}) => {


    
  return (
    <div className='itemSelectorCtn'>
        <ItemSelectorBtn text="BEGIN" changeItemToPlace={changeItemToPlace} itemToPlace={itemToPlace}/>
        <ItemSelectorBtn text="END" changeItemToPlace={changeItemToPlace} itemToPlace={itemToPlace}/>
        <ItemSelectorBtn text="WALL" changeItemToPlace={changeItemToPlace} itemToPlace={itemToPlace}/>
        <ItemSelectorBtn text="REMOVE" changeItemToPlace={changeItemToPlace} itemToPlace={itemToPlace}/>
    </div>
  )
}

export default ItemSelector