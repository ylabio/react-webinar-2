import React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./style.css";

const modalRoot = document.querySelector("#modal-root");

function Modal({ onCloseModal, children }) {
  const onEscapeClick = (e) => {
    if (e.code === "Escape") {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onEscapeClick);
    return () => {
      window.removeEventListener("keydown", onEscapeClick);
    };
  });

  const closeOverlay = (e) => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={closeOverlay}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default React.memo(Modal);
