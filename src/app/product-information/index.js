import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ProductCard from "../../components/product-card";
import Select from "../../components/language-select";
import MainMenu from "../../components/main-menu";
import {translateLanguage} from "../../utils/translate-language";
import Loader from "../../components/loader";
import MenuWrapper from "../../components/menu-wrapper";

function ProductInformation() {
  
  console.log('ProductInformation');
  
  const store = useStore();
  
  const select = useSelector(state => ({
    id: state.product.id,
    title: state.product.title,
    description: state.product.description,
    country: state.product.country,
    category: state.product.category,
    year: state.product.year,
    price: state.product.price,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.translation.language,
    isProductLoading: state.product.isProductLoading
  }));
  
  const callbacks = {
    // Открытие корзины
    load: useCallback(() => store.get('catalog').load(), []),
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Получение данных о выбранном товаре
    getProductInformation: useCallback((_id) => store.get('product').getProductInformation(_id), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Получение данных товара
    changeLanguage: useCallback((language) => store.get('translation').changeLanguage(language), [])
  };
  
  const [words, setWords] = useState({});
  
  useEffect(() => {
    setWords(translateLanguage(select.language))
  }, [select.language]);
  
  useEffect(() => {
    if (window.location.pathname.includes('productInformation/')) {
      callbacks.getProductInformation(window.location.pathname.split('productInformation/')[1])
    }
  }, []);
  
  return (
    <Layout
      head={<><h1>{select.title}</h1><Select changeLanguage={callbacks.changeLanguage} language={select.language}/></>}>
      <MenuWrapper>
        <MainMenu words={{main: words.main}}/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} words={
          {
            main: words.main,
            inCart: words.inCart,
            empty: words.empty,
            item: words.item,
            goTo: words.goTo
          }}/>
      </MenuWrapper>
      {!select.isProductLoading ?
        <ProductCard
          id={select.id}
          description={select.description}
          country={select.country}
          category={select.category}
          year={select.year}
          price={select.price}
          addToBasket={callbacks.addToBasket}
          words={{
            country: words.country,
            category: words.category,
            year: words.year,
            price: words.price,
            add: words.add
          }}/> : <Loader />}
    </Layout>
  )
}

export default React.memo(ProductInformation);
