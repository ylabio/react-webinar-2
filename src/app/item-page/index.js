import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import { Link, BrowserRouter as Router, Route, useParams } from "react-router-dom";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemPage(props){
  const cn = bem('ItemPage');
  let params = useParams();

  console.log('ItemPage');
  console.log(params.itemId);

  const store = useStore();

  const select = useSelector(state => ({
    currentItem: state.catalog.currentItem,
    currentItemCountry: state.catalog.currentItemCountry,
    currentItemCountryCode: state.catalog.currentItemCountryCode,
    currentItemCategory: state.catalog.currentItemCategory,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.get('catalog').loadItemById(params.itemId);
  }, [])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(params.itemId), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>{select.currentItem.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <div className={cn('container')}>
        <div className={cn('description')}>{select.currentItem.description}</div>
        <div className={cn('country')}>{select.currentItemCountry}{select.currentItemCountryCode}</div>
        <div className={cn('category')}>{select.currentItemCategory}</div>
        <div className={cn('year')}>{select.currentItem.edition}</div>
        <div className={cn('price')}>{select.currentItem.price} ₽</div>
        <button onClick={callbacks.addToBasket}>Добавить</button>
      </div>
    </Layout>
  )
}

export default React.memo(ItemPage);
