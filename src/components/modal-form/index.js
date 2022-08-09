import React from "react";
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
      <CartList orders={orders} onItemDelete={onItemDelete} total={total} />
    </>
  );
};

export default React.memo(ModalForm);
