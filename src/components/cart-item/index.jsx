import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const CartItem = ({ cart, onDeleteItem }) => {
  const cn = bem("cart-item");

  return (
    <div className={cn("wrapper")}>
      {cart.map((item) => {
        return (
          <div className={cn()} key={item.code}>
            <div className={cn("code")}>
              <div>{item.code}</div>{" "}
              <div className={cn("title")}>{item.title}</div>
            </div>
            <div className={cn("info")}>
              <div className={cn("price")}>
                {item.price.toLocaleString("ru-RU")}
              </div>
              <div className={cn("amount")}>
                {item.amount} {"шт"}
              </div>
              <button
                onClick={() => onDeleteItem(item.code)}
                className={cn("cart-button")}
              >
                Удалить
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;
