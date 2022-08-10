import React from "react";
import "./style.css";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

function Modal(props) {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <div className={cn("description")}>
            <h1 className={cn("title")}>{props.title}</h1>
            <button onClick={props.onCloseModal} className={cn("button")}>{props.buttonName}</button>
        </div>
         {props.children}
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
