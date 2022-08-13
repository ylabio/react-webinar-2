import React, {useCallback, useEffect} from "react";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import ProductPage from "../../components/product-page";
import Wrapper from "../../components/wrapper";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Menu from "../../components/menu";
import {useParams} from "react-router-dom"
import NotFound from "../../components/not-found";
import Head from "../../components/head";


function Product() {
  const store = useStore();

  const {id} = useParams();

  useEffect(() => {
    store.get('product').load(id);
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.product.item,

    language: state.localization.language
  }));
  
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Смена языка сайта
    changeLanguage: useCallback(language => store.get('localization').changeLanguage(language), [])
  };

  return (
    <Layout head={<Head language={select.language} changeLanguage={callbacks.changeLanguage} title={select.item.title}/>}>
      <Wrapper>
        <Menu language={select.language}/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} language={select.language}/>
      </Wrapper>
      {select.item ? 
        <ProductPage onAdd={callbacks.addToBasket} item={select.item} language={select.language}/> : <NotFound/>
      }
    </Layout>
  )
}

export default Product;