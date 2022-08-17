import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import { useNavigate, useSearchParams  } from "react-router-dom";
import Navigation from "../../components/navigation";
import './style.css';
import Container from "../../components/container";

function Main(){
  const [searchParams] = useSearchParams();
  const currentPage = +searchParams.get('page') || 1;

  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    limit: state.catalog.limit,
    currentPage: state.catalog.currentPage
  }));

  const navigate = useNavigate();

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),

    getItem: useCallback(() => {
      const skip = (currentPage - 1) * select.limit;
      store.get('catalog').load(select.limit, skip)
    }, [currentPage]),

    goToPage: useCallback((currentPage) => {
      store.get('catalog').setCurrentPage(currentPage);
      navigate({search: `?page=${currentPage}`});
    }, []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} path={`product/${item._id}`} onAdd={callbacks.addToBasket}/>, []),
  }
// ?page=${select.currentPage}
  useEffect(() => {
    callbacks.getItem();
  }, [currentPage])

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Container>
        <Navigation />
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Container>
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        currentPage={currentPage}
        totalCount={select.count}
        limit={select.limit}
        onPageChange={callbacks.goToPage}
      />
    </Layout>
  )
}

export default React.memo(Main);
