import React from "react";

function ItemList({ item, store }) {
  const [state, setState] = React.useState(0);

  const counter = () => setState(state + 1);

  return (
    <div key={item.code} className="List__item">
      <div
        className={"Item" + (item.selected ? " Item_selected" : "")}
        onClick={() => store.selectItem(item.code)}
      >
        <div className="Item__number">{item.code}</div>
        <div onClick={counter} className="Item__title">
          {item.title}
          {state > 1 && <i> | Выделялось {Math.floor(state / 2)} раз</i>}
        </div>
        <div className="Item__actions">
          <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default ItemList;
