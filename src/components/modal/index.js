import React from "react";
import "./style.css";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import ListBasket from "../list-basket";

function Modal(props) {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <div className={cn("description")}>
            <h1 className={cn("title")}>{props.title}</h1>
            <button onClick={props.onCloseModal} className={cn("button")}>{props.buttonName}</button>
        </div>
         <ListBasket stateBasket={props.stateBasket} onDeleteOfBasket={props.onDeleteOfBasket} calculationSumPrice={props.calculationSumPrice}/>
      </div>
    </div>
  );
}

Modal.propTypes = {
  stateBasket: propTypes.array.isRequired,
  onCloseModal: propTypes.func
};

Modal.defaultProps = {
  stateBasket: [],
  onCloseModal: () => {}
};

export default React.memo(Modal);
