import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Preload from "../../components/preload";
import Menu from "../../components/menu";

function Main(){

  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalCount: state.catalog.paginator.totalCount,
    isLoading: state.catalog.isLoading,
    currentPage: state.catalog.paginator.currentPage,
    perPage: state.catalog.paginator.perPage
  }));

  useEffect(() => {
    store.get('catalog').load();
  }, [select.currentPage])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Смена страницы
    changePage: useCallback((page) => store.get('catalog').setCurrentPage(page), []),
  };

  const renders = {
    item: useCallback(item => <Item linkTo={'/articles/'} item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
      <Layout head={<h1>Магазин</h1>}>
        <Menu linkTo={'/'} nav={'Главная'}/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        {select.isLoading ? <Preload/>:<List items={select.items} renderItem={renders.item}/>}
        <Pagination perPage={select.perPage} totalCount={select.totalCount} currentPage={select.currentPage} onChangePage={callbacks.changePage}/>
      </Layout>
  )
}

export default React.memo(Main);
