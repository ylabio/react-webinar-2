import React, { useState } from "react";
import "./styles.css";

export default function ListItem(props) {
  const { title, code, selected, handleDelete, handleSelect } = props;
  const [counter, setCounterIcrease] = useState(0);

  return (
    <div className="List__item">
      <div
        className={"Item" + (selected ? " Item_selected" : "")}
        onClick={() => {
          handleSelect();
          setCounterIcrease(counter + 1);
        }}
      >
        <div className="Item__number">{code}</div>
        <div className="Item__title">
          {title}
          {Boolean(counter) && ` | Выделялся ${counter} раз`}
        </div>
        <div className="Item__actions">
          <button onClick={handleDelete}>Удалить</button>
        </div>
      </div>
    </div>
  );
}
