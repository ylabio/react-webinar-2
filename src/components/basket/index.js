import React, { useState, useCallback, memo } from "react";
import Layout from "../layout";
import List from "../list";
import Item from "../item";
import Button from "../button";
import "./style.css";
import { getFormatedPrice } from "../../utils";
import propTypes from "prop-types";

function Basket({
  itemsAmount,
  itemsPrice,
  basketItems,
  getState,
  deleteFromBasket,
}) {
  const [items, setItems] = useState(basketItems);

  const callbacks = {
    deleteFromBasket: useCallback(
      (code) => {
        deleteFromBasket(code);
        setItems([...getState().basket.items]);
      },
      [items]
    ),
  };

  return (
    <Layout head={<h2>Корзина</h2>} minHeight="603px" width="960px">
      <List
        itemsData={items}
        itemsComponent={[Item, [Button, "Удалить", callbacks.deleteFromBasket]]}
      />
      {itemsAmount > 0 && (
        <div className="Basket__amountPrice">
          Итого
          <span>{getFormatedPrice(itemsPrice)}</span>
        </div>
      )}
    </Layout>
  );
}

Basket.propTypes = {
  itemsAmount: propTypes.number.isRequired,
  itemsPrice: propTypes.number.isRequired,
  basketItems: propTypes.array.isRequired,
  getState: propTypes.func.isRequired,
  deleteFromBasket: propTypes.func.isRequired,
};

export default memo(Basket);
