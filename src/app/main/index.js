import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Paginate from "../../components/paginate";
import { Link } from "react-router-dom";
import SwitcherLanguage from "../../components/switcher-language";

function Main() {


  console.log('Main');

  const store = useStore();


  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalSum: state.catalog.totalSum,
    language: state.multilang.CurrentLang,
    alllanguage: state.multilang,
    position: state.catalog.position
  }));




  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Загрузка каталога
    catalogLoad: useCallback(data => store.get('catalog').load(data), []),

    switchLang: useCallback(name => store.get('multilang').switchLang(name), [])
  };



  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} />, []),
  }

  return (
    <Layout head={<h1>{select.language.mainTitle}</h1>}>
      <SwitcherLanguage langKey={Object.keys(select.alllanguage)} switchFn={callbacks.switchLang} />
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List items={select.items} renderItem={renders.item} catalogLoad={callbacks.catalogLoad} />
      <Paginate position={select.position} totalSum={select.totalSum} catalogLoad={callbacks.catalogLoad} />
    </Layout>


  )
}

export default React.memo(Main);
