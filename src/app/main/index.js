import {Routes, Route} from 'react-router-dom';
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Translate from '../../components/translate';
import Pagination from "../../components/pagination";
import Article from '../article';
import NoMatch from '../no-match';

function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    article: state.catalog.currentItem,
    articleTitle: state.catalog.currentItem?.title,
    activePage: state.catalog.pagination.activePage,
    visiblePages: state.catalog.pagination.visiblePages,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Загрузка товара при пагинации
    loadPage: useCallback((pageNum) => store.get('catalog').loadPage(pageNum), []),
    // Загрузка подробной информации о товаре
    loadArticle: useCallback((_id) => store.get('catalog').loadArticle(_id), []),
    // Смена языка
    setLanguage: useCallback((lang) => store.get('lang').setLanguage(lang), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Routes>
      <Route path="/" element={<Layout head={<h1><Translate>Магазин</Translate></h1>} setLang={callbacks.setLanguage}/>}>
        <Route index element={
          <>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            <List items={select.items} renderItem={renders.item}/>
            <Pagination activePage={select.activePage} 
                        visiblePages={select.visiblePages} 
                        loadPage={callbacks.loadPage}
            />
          </>
        }/>
      </Route>

      <Route path="/article" element={<Layout head={<h1>{select.articleTitle}</h1>} setLang={callbacks.setLanguage}/>}>
        <Route path=":_id" element={
          <>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            <Article article={select.article} loadArticle={callbacks.loadArticle} onAdd={callbacks.addToBasket}/>
          </>
        }/>
      </Route>

      <Route path="*" element={<Layout head={<h1><Translate>Страница не найдена</Translate></h1>} setLang={callbacks.setLanguage}/>}>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

export default React.memo(Main);
