import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

function CartItem({ item, onButtonClick }) {
  const cn = bem("Item"); // Так как стили общие, используем BEM-блок из Item, дополнительные стили не используем

  return (
    <div className={cn()}>
      {<div className={cn("number")}>{item.code}</div>}

      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>
        {item.price.toLocaleString("ru")} ₽
      </div>
      {<div className={cn("quantity")}>{item.quantity} шт</div>}

      <div className={cn("actions")}>
        <button onClick={() => onButtonClick(item.code)}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onButtonClick: propTypes.func.isRequired,
};

CartItem.defaultProps = {
  /* 
    Дефолтные пропсы 
  */
};

export default React.memo(CartItem);
