import React, { useCallback, memo } from "react";
import { createPortal } from "react-dom";
import "./style.css";
import propTypes from "prop-types";

function Modal({ children, closeModal }) {
  const callbacks = {
    closeModal: useCallback((e) => {
      if (e.target.className === "Modal") closeModal();
    }),
  };

  return createPortal(
    <div className="Modal" onClick={callbacks.closeModal}>
      <div className="Modal__content">
        <button className="Modal__close-button" onClick={closeModal}>
          Закрыть
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  children: propTypes.node.isRequired,
  closeModal: propTypes.func.isRequired,
};

export default memo(Modal);
