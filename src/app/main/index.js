import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";

function Main(){

  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    activePage: state.catalog.activePage,
    language: state.languages,
  }));

  useEffect(() => {
    store.get('catalog').load(select.activePage);
  }, [select.activePage]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    setPage: useCallback(activePage => store.get('catalog').setPage(activePage), []),
    changeLanguage: useCallback(() => store.get('languages').changeLanguage(), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} language={select.language}/>, [select.language]),
  }

  return (
    <Layout head={<h1>{select.language.shop}</h1>} language={select.language.languageName} changeLanguage={callbacks.changeLanguage}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} language={select.language}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination count={select.count}                  
                  paginate={callbacks.setPage}
                  activePage={select.activePage}
                  />
    </Layout>
  )
}

export default React.memo(Main);
