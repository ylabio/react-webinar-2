import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Modal({children, сardClose, title}) {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("wrap")}>
        <div className={cn("head")}>
          <h2 className={cn("title")}>{title}</h2>
          <button className={cn("button")} onClick={сardClose}>
            Закрыть
          </button>
        </div>
        <div className={cn("content")}>
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: propTypes.node,
  title: propTypes.string.isRequired,
  сardClose: propTypes.func.isRequired
};

Modal.defaultProps = {};

export default React.memo(Modal);
