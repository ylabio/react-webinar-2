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
      <div>{{ ...item.maidIn }.title}</div>
      <div>{{ ...item.category }.title}</div>
      <div>{item.edition}</div>
      <div>{item.price} ₽</div>
      <Controls onAdd={callbacks.onAdd} />
    </div>
  );
}

export default React.memo(Info);
