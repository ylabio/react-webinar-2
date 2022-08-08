import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import List from "../list";
import "./style.css";

function Basket(props) {
  const cn = bem("Basket");
  return (
    <div className="Overlay">
      <div className={cn()}>
        <div className={cn("head")}>
          <h1>Корзина</h1>
          <button onClick={props.isBasketOpened}>Закрыть</button>
        </div>
        <div className={cn("content")}>
          <List
            items={props.BasketItems}
            onClickButton={props.onDeleteFromBasket}
            onBasket
          />
          <div className={cn("content-info")}>
            {props.BasketItems.length ? (
              <>
                <b>Итого</b>
                <b>{props.totalPrice.toLocaleString("ru")} ₽</b>
              </>
            ) : (
              <h2>В корзине пусто</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Basket.propTypes = {
  totalPrice: propTypes.number,
  BasketItems: propTypes.arrayOf(propTypes.object).isRequired,
  isBasketOpened: propTypes.func,
  onDeleteFromBasket: propTypes.func.isRequired,
};

Basket.defaultProps = {
  totalPrice: 0,
  BasketItems: [],
  isBasketOpened: () => {},
  onDeleteFromBasket: () => {},
};

export default React.memo(Basket);
