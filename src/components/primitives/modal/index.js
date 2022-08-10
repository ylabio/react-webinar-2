import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Modal({ title, children, closeModal }) {
  const cn = bem("Modal");

  return (
    <div className={cn("shadow-box")} onClick={closeModal}>
      <div className={cn("window")} onClick={(e) => e.stopPropagation()}>
        <div className={cn("header")}>
          {title}
          <button onClick={closeModal}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: propTypes.node,
  children: propTypes.node,
  closeModal: propTypes.func.isRequired,
};

export default React.memo(Modal);
