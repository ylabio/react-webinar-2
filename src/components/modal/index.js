import React from "react";
import "./sryle.css";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import ModalHeader from "../modal-header";
import CartPrice from "../cart-price";

const Modal = ({ children, showModal, modalName, cartPrice }) => {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <ModalHeader showModal={showModal} modalName={modalName} />
        {children}
        <CartPrice cartPrice={cartPrice} />
      </div>
    </div>
  );
};

export default React.memo(Modal);

Modal.propType = {
  children: propTypes.element,
  showModal: propTypes.func,
  modalName: propTypes.string,
  cartPrice: propTypes.object,
};

Modal.defaultProps = {
  children: <></>,
  showModal: () => {},
  modalName: "",
  cartPrice: {},
};
