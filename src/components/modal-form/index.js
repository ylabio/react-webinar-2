import React from "react";
import propTypes from "prop-types";
import "./style.css";
import Button from "../button";
import CartList from "../cart-list";

const ModalForm = ({ toggleOnClick, orders, onItemDelete, total }) => {
  return (
    <>
      <div className="HeaderWrap">
        <h1>Корзина</h1>
        <Button type="button" onClick={toggleOnClick}>
          Закрыть
        </Button>
      </div>
      <div className="Empty"></div>
      <CartList orders={orders} onItemDelete={onItemDelete} total={total} />
    </>
  );
};

export default React.memo(ModalForm);

ModalForm.propTypes = {
  toggleOnClick: propTypes.func.isRequired,
  orders: propTypes.arrayOf(propTypes.object).isRequired,
  total: propTypes.number.isRequired,
  onItemDelete: propTypes.func.isRequired,
};

ModalForm.defaultProps = {
  toggleOnClick: () => {},
  onItemDelete: () => {},
  orders: [],
  total: 0,
};
