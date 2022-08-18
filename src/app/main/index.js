import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ListPagination from "../../components/list-pagination";
import Select from "../../components/language-select";
import MainMenu from "../../components/main-menu";
import {translateLanguage} from "../../utils/translate-language";
import Loader from "../../components/loader";
import MenuWrapper from "../../components/menu-wrapper";
import PageHead from "../../components/page-head";

function Main() {
  
  console.log('Main');
  
  const store = useStore();
  
  const select = useSelector(state => ({
    items: state.catalog.items,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.translation.language,
    isCatalogLoading: state.catalog.isCatalogLoading
  }));
  
  const [words, setWords] = useState({});
  
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переключение страницы
    switchPage: useCallback((page) => store.get('catalog').switchPage(page), []),
    // Получение данных товара
    getProductInformation: useCallback((id) => store.get('product').getProductInformation(id), []),
    // Получение данных товара
    changeLanguage: useCallback((language) => store.get('translation').changeLanguage(language), [])
  };
  
  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}
                                    getProductInformation={callbacks.getProductInformation}
                                    words={{add: words.add}} path='/productInformation/'/>, [words]),
  }
  
  useEffect(() => {
    setWords(translateLanguage(select.language))
  }, [select.language]);
  
  useEffect(() => {
    store.get('catalog').load();
  }, [select.currentPage])
  
  return (
    <Layout head={<PageHead title={words.cart} changeLanguage={callbacks.changeLanguage} language={select.language}/>}>
      <MenuWrapper>
        <MainMenu words={
          {main: words.main,}
        }/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} words={
          {
            main: words.main,
            inCart: words.inCart,
            empty: words.empty,
            item: words.item,
            goTo: words.goTo
          }
        }/>
      </MenuWrapper>
      {!select.isCatalogLoading ?
        <>
          <List items={select.items} renderItem={renders.item}/>
          <ListPagination
            currentPage={select.currentPage}
            switchPage={callbacks.switchPage}
            totalPages={select.totalPages}
          />
        </> :  <Loader />}
    </Layout>
  )
}

export default React.memo(Main);
