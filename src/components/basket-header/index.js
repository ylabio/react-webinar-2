import React from "react";
import "./style.css";

const BasketHeader = ({ closeToCart }) => {
  return (
    <div className="basket__header">
      <h2>Корзина</h2>
      <button onClick={closeToCart}>Закрыть</button>
    </div>
  );
};

export default React.memo(BasketHeader);
