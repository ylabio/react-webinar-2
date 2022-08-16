import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";
import {withLocale} from "../../contexts/locale.context";
import {useSearchParams} from "react-router-dom"

function Main({lang}){

  console.log('Main');

  const store = useStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';

  const [currentPage, setCurrentPage] = useState(Number(page));

  useEffect(() => {
    store.get('catalog').load(currentPage);
  }, [currentPage])

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    items: state.catalog.items,
    limit: state.catalog.limit,
    totalCount: state.catalog.totalCount,
    currentPage: state.catalog.currentPage,
    loading: state.catalog.loading
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const onSelect = (value) => {
    setCurrentPage(value);
    setSearchParams({page: value});
  }

  const renders = {
    item: useCallback(item => (
        <Item item={item} onAdd={callbacks.addToBasket}/>
    ), []),
  }

  return (
    <Layout head={<h1>{lang.handle('store')}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <div style={{"maxWidth": "1024px", "height": "621px"}}>
        {
          select.loading ? 
          <Spinner/> :
          <List items={select.items} renderItem={renders.item}/>
        }
      </div>
      <Pagination totalNumberOfPage={Math.ceil(select.totalCount / select.limit)} currentPage={select.currentPage} onSelect={onSelect}/>
    </Layout>
  )
}

export default React.memo(withLocale(Main));
