import React, { useCallback } from "react";
import Controls from "../controls";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Info({ item, onAdd }) {
  const cn = bem("Info");

  const callbacks = {
    onAdd: useCallback((e) => onAdd(item._id), [onAdd, item]),
  };

  return (
    <div className={cn()}>
      <div>{item.description}</div>
      <div>
        Страна производитель:&ensp;<h5>{{ ...item.maidIn }.title}</h5>
      </div>
      <div>
        Категория:&ensp;<h5>{{ ...item.category }.title}</h5>
      </div>
      <div>
        Год выпуска:&ensp;<h5>{item.edition}</h5>
      </div>
      <div>
        <h4>Цена:&ensp;{item.price} ₽</h4>
      </div>
      <div>
        <Controls onAdd={callbacks.onAdd} />
      </div>
    </div>
  );
}

export default React.memo(Info);
