import React from "react";
import { cn as bem } from "@bem-react/classname";
const cn = bem("Cart");
import "./style.css";
import Button from "../button";
const Cart = () => {
  return (
    <div className={cn("container")}>
      <div className={cn()}>
        <div className={cn("top")}>
          <div>Корзина</div>
          <Button>Закрыть</Button>
        </div>
        <div className={cn("content")}>
          <div className={cn("content--left")}>
            <div>1</div>
            <div>Название товара</div>
          </div>
          <div className={cn("content--right")}>
            <div>100₽</div>
            <div>2 шт</div>
            <div>
              <Button>Удалить</Button>
            </div>
          </div>
        </div>

        <div className={cn("footer")}>
          <div className={cn("footer--total-price")}>
            <span>Итого:</span> 223 ₽
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
