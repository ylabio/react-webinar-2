import React, { useState } from "react";
import { getDeclinationWord } from "../../utils";
import "./styles.css";

export default function ListItem(props) {
  const { title, code, selected, handleDelete, handleSelect } = props;
  const [counter, setCounterIncrease] = useState(0);

  return (
    <div className="List__item">
      <div
        className={"Item" + (selected ? " Item_selected" : "")}
        onClick={() => {
          handleSelect();
          !selected && setCounterIncrease(counter + 1);
        }}
      >
        <div className="Item__number">{code}</div>
        <div className="Item__title">
          {title}
          {Boolean(counter) &&
            ` | Выделялось ${counter} ${getDeclinationWord(counter)}`}
        </div>
        <div className="Item__actions">
          <button onClick={handleDelete}>Удалить</button>
        </div>
      </div>
    </div>
  );
}
