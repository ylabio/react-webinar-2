import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BasketSimple from '../../components/basket-simple';
import Controls from '../../components/controls';
import LangSwitcher from '../../components/lang-switcher';
import List from '../../components/list';
import Layout from '../../components/layout';
import Item from '../../components/item';
import Navbar from '../../components/navbar';
import Pagination from '../../components/pagination';
import Preloader from '../../components/preloader';
import { language } from '../../store/exports';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';

function Main() {
  const store = useStore();
  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
    currentPage: state.catalog.currentPage,
    pages: state.catalog.pages,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentLang: state.language.currentLang,
    langPack: state.language.langPack
  }));

  console.log('Main');

  useEffect(() => {
    store.get('catalog').load(select.limit, select.skip);
  }, [select.skip]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Установка пагинации
    setPagination: useCallback(page => store.get('catalog').setPagination(page), []),
    // Установка начального массива страниц для пагинации
    setInitialPages: useCallback(() => store.get('catalog').setInitialPages(), []),
    // Переключение языка страницы
    switchLang: useCallback(event => store.get('language').switch(event.target.checked), [])
  };

  const renders = {
    item: useCallback(item =>
      <Item
        item={item}
        itemLink={`card/${item._id}`}
        onAdd={callbacks.addToBasket}
        langPack={select.langPack.item}
      />, [select.currentLang])
  };

  return (
    <Layout head={
      <>
        <h1>{select.langPack.main.title}</h1>
        <LangSwitcher currentLang={select.currentLang} switchLang={callbacks.switchLang} />
      </>
    }>
      <Controls>
        <Navbar>
          <Link to="/">{select.langPack.navbar.mainPage}</Link>
        </Navbar>
        <BasketSimple
          langPack={select.langPack.simpleBasket}
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Controls>
      {select.items.length
        ? <List items={select.items} renderItem={renders.item} />
        : <Preloader>
          <h2>Loading...</h2>
        </Preloader>}
      {select.count > select.limit &&
        <Pagination
          setInitialPages={callbacks.setInitialPages}
          setPagination={callbacks.setPagination}
          currentPage={select.currentPage}
          pages={select.pages} />}
    </Layout>
  );
}

export default React.memo(Main);
