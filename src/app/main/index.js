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
    limit: state.pagination.limit,
    skip: state.pagination.skip,
    currentPage: state.pagination.currentPage,
  }));

  useEffect(() => {
    store.get('catalog').load(select.limit, select.skip);
  }, [select.skip]);

 
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
     // Установка текущей страницы
     setCurrentPage: useCallback(page => store.get('pagination').setCurrentPage(page), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List items={select.items} renderItem={renders.item} />
      {select.count > select.limit && (
        <Pagination
          setCurrentPage={callbacks.setCurrentPage}
          count={select.count}
          limit={select.limit}
          currentPage={select.currentPage}
        />
      )}
    </Layout>
  );
}

export default React.memo(Main);