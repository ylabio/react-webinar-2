import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import ItemDetails from "../../components/item-details";

function ItemPage() {
  const store = useStore();
  const params = useParams();

  const { amount, sum, item, items } = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    items: state.catalog.items,
    item: state.catalog.item,
  }));

  useEffect(() => {
    store.get("catalog").setItem(params.id);
  }, []);

  const callbacks = {
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{item.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={amount} sum={sum} />
      <ItemDetails item={item} onAdd={callbacks.addToBasket} />
    </Layout>
  );
}

export default ItemPage;
