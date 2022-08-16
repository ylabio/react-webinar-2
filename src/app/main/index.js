import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import {useParams} from "react-router";
import Navigation from "../../components/navigation";
import {PATH} from "../index";

function Main() {

  console.log('Main');
  const store = useStore();
  const {page} = useParams()

  useEffect(() => {
    store.get('catalog').load(+page - 1);
  }, [page])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPage: state.catalog.totalPage,
    page: state.catalog.page,
    pageSize: state.catalog.pageSize
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(item => <Item
      item={item}
      onAdd={callbacks.addToBasket}
      itemLink={`${PATH.DESCRIPTION}/${item._id}`}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Navigation page={select.page}/>
      <BasketSimple onOpen={callbacks.openModalBasket}
                    amount={select.amount}
                    sum={select.sum}/>
      <List items={select.items}
            renderItem={renders.item}/>
      <Pagination totalPage={select.totalPage}
                  page={page}/>
    </Layout>
  )
}

export default React.memo(Main);
