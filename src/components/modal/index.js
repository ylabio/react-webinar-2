import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Modal({ setModal, head, children }) {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <div className={cn("head")}>
          {head}
          <button onClick={() => setModal(false)}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  setModal: propTypes.func,
  children: propTypes.node,
};

Modal.defaultProps = {
  setModal: () => {},
};

export default React.memo(Modal);
