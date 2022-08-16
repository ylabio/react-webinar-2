import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";
import getTranslation from "../../services/locale";
import {useNavigate, useParams} from "react-router-dom";
import skip from "../../utils/skip";
import Navigation from "../../components/navigation";

function Main(){

  console.log('Main');

  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector(state => ({
    items: state.catalog.items,
    total: state.catalog.total,
    amount: state.basket.amount,
    sum: state.basket.sum,
    current: state.catalog.current,
    limit: state.catalog.limit,
    isLoading: state.catalog.isLoading,
    language: state.language.value,
  }));

  const {page} = useParams();
  const currentPage = page ? parseInt(page, 10) : select.current;

  useEffect(() => {
    if (parseInt(page, 10) !== select.current) store.get('catalog').changePage(parseInt(page, 10));
    store.get('catalog').load(skip(currentPage, select.limit), select.limit);
  }, [currentPage]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(id => store.get('basket').addToBasket(id), []),
    changePage: useCallback(page => {
      navigate(`/catalog/${page}`, { replace: true });
      store.get('catalog').changePage(page);
      store.get('catalog').setLoadingTrue();
    }, []),
    onHomeClick:  useCallback(evt => {
      evt.preventDefault();
      navigate(`/catalog/${select.current}`, { replace: true });
    }, [select.current]),
    onItemClick: useCallback(id => {
      navigate(`/article/${id}`, { replace: true });
    }, []),
    getTranslation: useCallback(code => {
      return getTranslation(select.language, code);
    }, [select.language]),
    changeLanguage: useCallback(value => {
      console.log('CALLBACK');
      store.get('language').changeLanguage(value);
    }, [select.language]),
  };

  const renders = {
    item: useCallback(item => (
      <Item item={item}
            onAdd={callbacks.addToBasket}
            onItemClick={callbacks.onItemClick}
            getTranslation={callbacks.getTranslation}/>
    ), [select.language]),
  }

  return (
    <Layout head={<h1>{callbacks.getTranslation('shop') || 'Магазин'}</h1>}
            onLanguageChange={callbacks.changeLanguage}
            currentLanguage={select.language}>
      <Navigation onClick={callbacks.onHomeClick}
                  getTranslation={callbacks.getTranslation}/>
      <BasketSimple onOpen={callbacks.openModalBasket}
                    amount={select.amount}
                    sum={select.sum}
                    getTranslation={callbacks.getTranslation}/>
      {!select.isLoading ?
      <>
        <List items={select.items} renderItem={renders.item}/>
        <Pagination itemsNumber={select.total}
                    currentPage={currentPage}
                    itemsPerPage={select.limit}
                    onChange={callbacks.changePage} />
      </> : <Loader />}
    </Layout>
  )
}

export default React.memo(Main);
