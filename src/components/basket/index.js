import React, { useState, useCallback } from "react";
import Layout from "../layout";
import List from "../list";
import Item from "../item";
import { store } from "../../index";
import Button from "../button";
import "./style.css";
import { getFormatedPrice } from "../../utils";

function Basket() {
  const [items, setItems] = useState([...store.getState().basket.items]);
  const { itemsPrice, itemsAmount } = store.getState().basket;

  const callbacks = {
    deleteFromBasket: useCallback(
      (code) => {
        store.deleteFromBasket(code);
        setItems([...store.getState().basket.items]);
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

export default Basket;
