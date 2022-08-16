import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import ItemDescription from "../../components/item-description";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from 'react-router-dom';
import HomeButton from "../../components/home-button";
import Navigation from "../../components/navigation";

function ItemPage() {
  const store = useStore()
  const {id} = useParams()

  useEffect(() => {
    store.get('item').load(id);
    store.get('modals').close();
  }, [id]
  );

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.item,
    language: state.languages,
  }));

  const callbacks = {
    // Открытие и закрытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    changeLanguage: useCallback(() => store.get('languages').changeLanguage(), [])
  };


  
  return (
    <Layout head={<h1>{select.item.title}</h1>} language={select.language.languageName} changeLanguage={callbacks.changeLanguage}>
      <Navigation>
        <HomeButton language={select.language}/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} language={select.language}/>
      </Navigation>
      <ItemDescription item={select.item} onAdd={callbacks.addToBasket} language={select.language}/>
    </Layout>
  );
}

export default React.memo(ItemPage);
