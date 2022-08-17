import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useTranslation} from 'react-i18next';
import BasketSimple from "../../components/basket-simple";
import Item from "../../components/item";
import List from "../../components/list";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";
import LangSwitcher from "../../components/language-switcher";

function Main(){

  console.log('Main');

  const store = useStore();
  const { t } = useTranslation();

  const select = useSelector(state => ({
    articleRoute: state.article.articleRoute,
    items: state.catalog.items,
    itemsQty: state.catalog.itemsQty,
    pagSel: state.catalog.pagSel,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переход по элементу пагинации
    pagSurf: useCallback(pagSel => store.get('catalog').pagSurf(pagSel), [])
  };

  const renders = {
    item: useCallback(item =>
      <Item item={item} onAdd={callbacks.addToBasket} articleRoute={select.articleRoute}/>, []),
  }

  return (
    <Layout head={<h1>{t('MainTitle')}</h1>} langSwitch={<LangSwitcher/>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination itemsQty={select.itemsQty} pagSel={select.pagSel} pagSurf={callbacks.pagSurf}/>
    </Layout>
  )
}

export default React.memo(Main);
