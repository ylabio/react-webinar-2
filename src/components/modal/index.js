import React from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import ListBasket from "../list-basket";

function Modal(props) {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <div className={cn("description")}>
            <h1 className={cn("title")}>Корзина</h1>
            <button onClick={props.onCloseBasket} className={cn("button")}>Закрыть</button>
        </div>
         <ListBasket stateBasket={props.stateBasket} onDeleteOfBasket={props.onDeleteOfBasket}/>
      </div>
    </div>
  );
}

export default React.memo(Modal);
