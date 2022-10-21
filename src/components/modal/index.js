import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Modal({ head, children, onClickToggle }) {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("main")}>
        <div className={cn("head")}>
          <div className={cn("head-title")}>{head}</div>
          <div className={cn("head-button")}>
            <button
              className={cn("head-button-off")}
              type="button"
              onClick={onClickToggle}
            >
              Закрыть
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node.isRequired,
  onClickToggle: propTypes.func.isRequired,
};

export default React.memo(Modal);
