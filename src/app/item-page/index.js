
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import { Link, BrowserRouter as Router, Route, useParams } from "react-router-dom";
import ItemInfo from "../../components/item-info";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {cn as bem} from "@bem-react/classname";
import TopBar from "../../components/top-bar";

function ItemPage(){
  const cn = bem('ItemPage');
  let params = useParams();

  console.log('ItemPage itemID');
  console.log(params.itemId);

  const store = useStore();

  const select = useSelector(state => ({
    currentItem: state.itemPage.currentItem,
    currentItemCountry: state.itemPage.currentItemCountry,
    currentItemCountryCode: state.itemPage.currentItemCountryCode,
    currentItemCategory: state.itemPage.currentItemCategory,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.get('itemPage').loadItemById(params.itemId);
  }, [params.itemId])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(params.itemId), []),
    // Перевод
    translate: useCallback((item) => store.get('localisation').translate(item), []),
    changeLanguage: useCallback((lang) => store.get('localisation').changeLanguage(lang), []),
  };

  
  return (
    <Layout head={<h1>{select.currentItem.title}</h1>} changeLanguage={callbacks.changeLanguage}>
      <TopBar translate={callbacks.translate} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ItemInfo
      item={select.currentItem}
      itemCountry={select.currentItemCountry}
      itemCountryCode={select.currentItemCountryCode}
      itemCategory={select.currentItemCategory}
      onAdd={callbacks.addToBasket}/>
    </Layout>
  )
}

export default React.memo(ItemPage);
