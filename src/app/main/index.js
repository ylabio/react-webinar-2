import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Paginator from "../../components/paginator";
import Preloader from "../../components/preloader";

function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagesCount: state.catalog.pagesCount,
    page: state.catalog.page,
    loading: state.catalog.loading,
    mainHead: state.names.names.mainHead
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Открытие страницы товара
    pageLoad: useCallback((_id) => store.get('page').pageLoad(_id), []),
    // Загрузка списка товаров
    load: useCallback((page) => store.get('catalog').load(page), []),
    // Изменение языка
    changeLanguage: useCallback((value) => store.get('names').changeLanguage(value), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item}
                                    onAdd={callbacks.addToBasket}
                                    pageLoad={callbacks.pageLoad}  
                              />, []),
  }

  return (
    <Layout head={<h1>{select.mainHead}</h1>} changeLanguage={callbacks.changeLanguage}>
      <BasketSimple onOpen={callbacks.openModalBasket}
                    amount={select.amount}
                    sum={select.sum} 
      />
      {select.loading ?
        <Preloader/>
        :
        <List items={select.items} renderItem={renders.item}/>}
      <Paginator pagesCount={select.pagesCount}
                 page={select.page}
                 load={callbacks.load}
      />
    </Layout>
  )
}

export default React.memo(Main);
