import React from "react";
import "./sryle.css";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";

const Modal = ({ children, modalName, showModal }) => {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <div className={cn("content-header")}>
          <h2>{modalName}</h2>
          <button onClick={() => showModal()}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default React.memo(Modal);

Modal.propType = {
  showModal: propTypes.func,
  item: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleteItem: propTypes.func,
  totalPrice: propTypes.number,
};

Modal.defaultProps = {
  showModal: () => {},
  item: [],
  onDeleteItem: () => {},
  totalPrice: 0,
};
