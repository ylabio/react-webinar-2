import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import Menu from "../../components/menu";
import Pagination from "../../components/pagination";
import Wrapper from "../../components/wrapper";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";


function Main(){

  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    limitPerPage: state.catalog.limitPerPage
  }));

  useEffect(() => {
    store.get('catalog').load(select.currentPage);
  }, [])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    changeNumberPage: useCallback(numberPage => store.get('catalog').load(numberPage), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Wrapper>
        <Menu/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Wrapper>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination currentPage={select.currentPage} totalPages={select.totalPages} limitPerPage={select.limitPerPage} changeNumberPage={callbacks.changeNumberPage}/>
    </Layout>
  )
}

export default React.memo(Main);
