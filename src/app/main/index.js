import React, { useState, useEffect, useCallback } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useNavigate, Link } from "react-router-dom";
import BasketSimple from "../../components/basket-simple";
import Controls from "../../components/controls";
import Menu from "../../components/menu";
import List from "../../components/list";
import Layout from "../../components/layout";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import ErrorMessage from "../../components/error-message";
import localization from "./localization";

function Main(){

  console.log('Main');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.catalog.totalPages,
    page: state.catalog.currentPage,
    lang: state.localization.lang
  }));

  useEffect(() => {
    setLoading(true);
    store.get('catalog').loadItems().then(() => setLoading(false), () => setError(true));
  }, [select.page]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    //Изменение страницы
    changePage: useCallback((page) => store.get('catalog').setPage(page), []),
    //Переход на страницу товара
    goToItemPage: useCallback((_id) => navigate(`/item/${_id}`), []),
    //Изменение языка
    setLang: useCallback(() => store.get('localization').setLang(), [])
  };

  const renders = {
    item: useCallback(item => (
      <Item item={item} onAdd={callbacks.addToBasket} lang={select.lang} linkFunc={callbacks.goToItemPage}/>
    ), [select.lang]),
    link: useCallback(() => <Link to="/">{localization[select.lang].linkMain}</Link>, [select.lang])
  };

  const head = (
    <h1>
      {error 
        ? localization[select.lang].headError 
        : loading ? localization[select.lang].headLoad : localization[select.lang].headDefault
      }
    </h1>
  );

  return (
    <Layout head={head} setLang={callbacks.setLang} lang={select.lang}>
      <Controls>
        <Menu linksRender={renders.link} />
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang}/>
      </Controls>
      {
        error 
        ? <ErrorMessage message={localization[select.lang].errorMessage}/> 
        : <>
            <List items={select.items} renderItem={renders.item}/>
            <Pagination page={select.page} totalPages={select.totalPages} changePage={callbacks.changePage}/>
          </>
      } 
    </Layout>
  )
}

export default React.memo(Main);
