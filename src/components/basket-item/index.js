import React from "react";
import "./style.css";

const BasketItem = ({ item, index }) => {
  return (
    <div className="basket__item">
      <div className="basket__item_number">{index + 1}</div>
      <div className="basket__item_title">{item.title}</div>
      <div className="basket__item_price">
        {`${item.price.toLocaleString()} ₽`}
      </div>
      <div className="basket__item_quantity">{`${item.quantity} шт`}</div>
      <div className="basket__item_actions">
        <button onClick={() => removeItemToCart(item.code)}>Удалить</button>
      </div>
    </div>
  );
};

export default React.memo(BasketItem);
