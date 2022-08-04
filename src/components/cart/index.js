import React from "react";
import { cn as bem } from "@bem-react/classname";
const cn = bem("Cart");
import "./style.css";
import Button from "../button";

const CartItem = ({ cartItem }) => {
  return (
    <div className={cn("content")}>
      <div className={cn("content--left")}>
        <div>1</div>
        <div>{cartItem.title}</div>
      </div>
      <div className={cn("content--right")}>
        <div>{cartItem.price}₽</div>
        <div>1 шт</div>
        <div>
          <Button>Удалить</Button>
        </div>
      </div>
    </div>
  );
};

const CartList = ({ cartItems }) => {
  return (
    <div>
      {cartItems.map((cartItem) => {
        return <CartItem cartItem={cartItem} />;
      })}
    </div>
  );
};

const Cart = ({ cartItems }) => {
  console.log("cartItems", cartItems);
  return (
    <div className={cn("container")}>
      <div className={cn()}>
        <div className={cn("top")}>
          <h1>Корзина</h1>
          <Button>Закрыть</Button>
        </div>
        <CartList cartItems={cartItems} />
        <div className={cn("footer")}>
          <div className={cn("footer--total-price")}>
            <span>Итого:</span> 223 ₽
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Cart);
