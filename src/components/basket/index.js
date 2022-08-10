// @ts-nocheck
import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";
import BasketItem from "../basket-item";

const Basket = ({
  totalPrice,
  basketItems,
  deleteItemsFromBasket,
  getModal,
}) => {
  const price = totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
  const cn = bem("Basket");

  return (
    <>
      <div className={cn("modal")}>
        <div className={cn("head")}>
          <h1>Корзина</h1>
          <button onClick={() => getModal(false)} className={cn("closeModal")}>
            закрыть
          </button>
        </div>

        {basketItems.length ? (
          <div>
            {basketItems.map((item) => (
              <div className={cn("item")} key={item.code}>
                <BasketItem
                  item={item}
                  deleteItemsFromBasket={deleteItemsFromBasket}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={cn("isEmpty")}>
            <h2>Корзина пуста</h2>
          </div>
        )}

        <div className={cn("total")}>
          <h3>Итого</h3> <h3>{price} ₽</h3>
        </div>
      </div>
    </>
  );
};

Basket.propTypes = {
  totalPrice: propTypes.number.isRequired,
  basketItems: propTypes.arrayOf(propTypes.object).isRequired,
  getModal: propTypes.func.isRequired,
  deleteItemsFromBasket: propTypes.func.isRequired,
};

export default React.memo(Basket);
