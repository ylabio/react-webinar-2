import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BasketSimple from '../../components/basket-simple';
import ItemCard from '../../components/item-card';
import LangSwitcher from '../../components/lang-switcher';
import Layout from '../../components/layout';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';

function Card() {
  const { id } = useParams();
  const store = useStore();
  const select = useSelector(state => ({
    item: state.card.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentLang: state.language.currentLang,
    langPack: state.language.langPack
  }));

  console.log('Card');

  useEffect(() => {
    store.get('card').load(id);
  }, [id]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переключение языка страницы
    switchLang: useCallback(event => store.get('language').switch(event.target.checked), [])
  };

  return (
    <Layout head={
      <>
        <h1>{select.item.title}</h1>
        <LangSwitcher currentLang={select.currentLang} switchLang={callbacks.switchLang} />
      </>
    }>
      <BasketSimple
        langPack={select.langPack.simpleBasket}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemCard
        item={select.item}
        onAdd={callbacks.addToBasket}
        langPack={select.langPack.cardItem}
      />
    </Layout>
  );
}

export default React.memo(Card);
