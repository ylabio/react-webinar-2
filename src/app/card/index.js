import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useStore from "../../utils/use-store";
import BasketSimple from "../../components/basket-simple";
import useSelector from "../../utils/use-selector";
import CardInfo from "../../components/card-info";

function Card() {
  const params = useParams();
  const store = useStore();

  const select = useSelector(state => ({
    language: state.locales.language,
    item: state.card.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    onAdd: useCallback((id) => store.get('basket').addToBasket(id), []),
  };

  useEffect(() => {
    store.get('card').getArticlesById(params.id);
  }, [params.id])
  
  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} language={select.language}/>
      <CardInfo item={select.item} onAdd={callbacks.onAdd} language={select.language}/>
    </Layout>
  )
}

export default Card;