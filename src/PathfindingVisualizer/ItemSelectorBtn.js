import React from "react";

const ItemSelectorBtn = ({ text, changeItemToPlace, itemToPlace }) => {
  return (
    <div className="itemSelectorBtn" onClick={changeItemToPlace} id={itemToPlace === text ? 'selected' : 'null'}>
      {text}
    </div>
  );
};

export default ItemSelectorBtn;
