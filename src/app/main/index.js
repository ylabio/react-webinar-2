import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Preload from "../../components/preload";

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
    totalCount: state.catalog.totalCount,
    isLoading: state.catalog.isLoading
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Смена страницы
    changePage: useCallback(page => store.get('catalog').load(page), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
      <Layout head={<h1>Магазин</h1>}>
        <BasketSimple crumbs={'Главная'} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        {select.isLoading ? <Preload/>:<List items={select.items} renderItem={renders.item}/>}
        <Pagination totalCount={select.totalCount} perPage={10} onChangePage={callbacks.changePage}/>
      </Layout>
  )
}

export default React.memo(Main);
