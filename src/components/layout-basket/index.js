import Modal from "../modal";
import React from "react";
import propTypes from "prop-types";

const LayoutBasket = (props) => {
  return (
    <Modal
      title="Корзина"
      buttonName="Закрыть"
      onCloseModal={props.onCloseModal}
    >
      {props.children}
    </Modal>
  );
};

LayoutBasket.propTypes = {
  onCloseModal: propTypes.func.isRequired,
};

export default React.memo(LayoutBasket);
