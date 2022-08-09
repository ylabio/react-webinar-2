import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Modal({ title, closeModal, children }) {
  const cn = bem("Modal");
  return (
    <div className={cn("wrapper")}>
      <div className={cn()}>
        <div className={cn("head")}>
          <h1>{title}</h1>
          <button onClick={closeModal}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: propTypes.string,
  children: propTypes.node.isRequired,
  closeModal: propTypes.func,
};

Modal.defaultProps = {
  title: "",
  closeModal: () => {}
};

export default React.memo(Modal);
