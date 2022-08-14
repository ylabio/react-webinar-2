import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect, useState } from 'react'
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useSearchParams } from "react-router-dom";

const LIMIT_VALUE = 10;
function Main(){

  const [searchParams, setSearchParams] = useSearchParams({limit: '10', skip: '0'});
  const [currentPage, setCurrentPage] = useState(0);

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(searchParams.get('limit'), searchParams.get('skip'));
  }, [searchParams])

  const select = useSelector(state => ({
    items: state.catalog.items,
    totalCount: state.catalog.totalCount,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    onChangePage: useCallback( (pageNumber) => {
      setCurrentPage(pageNumber)
      setSearchParams({limit: String(LIMIT_VALUE), skip: String(pageNumber * LIMIT_VALUE)});
    }, [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      {select.totalCount && (
        <Pagination
          onChange={callbacks.onChangePage}
          pageCount={Math.ceil(select.totalCount / LIMIT_VALUE)}
          currentPage={currentPage}
        />
      )}
    </Layout>
  )
}

export default React.memo(Main);
