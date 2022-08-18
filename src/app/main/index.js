import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import NavBar from "../../components/navbar";
import Menu from "../../components/menu";

function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').loadStart();
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pageNumber: state.catalog.pageNumber,
    curentPage: state.catalog.curentPage
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переход по страницам
    Paginate: useCallback(pageNumber => store.get('catalog').paginate(pageNumber), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <NavBar>
        <Menu links={[{name: 'Главная', path: '/'}]}/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </NavBar>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination pageNumber={select.pageNumber} curentPage={select.curentPage} paginate={callbacks.Paginate} />
    </Layout>
  )
}

export default React.memo(Main);
