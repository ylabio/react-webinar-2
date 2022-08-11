import React from "react";
import Background from "../background";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";

function Modal({ title, children, onClose }) {
  const cn = bem("Modal");

  return (
    <>
      <div className={cn()}>
        <div className={cn("title")}>{title}</div>
        <div className={cn("content")}>{children}</div>
        <button className={cn("close")} onClick={onClose}>
          Закрыть
        </button>
      </div>
      <Background onClick={onClose} />
    </>
  );
}

Modal.propTypes = {
  title: propTypes.node,
  children: propTypes.node,
  onClose: propTypes.func.isRequired,
};

export default React.memo(Modal);
