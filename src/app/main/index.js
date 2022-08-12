import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import Paginator from "../../components/paginator";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main(){

  console.log('Main');

  const store = useStore();
  const [pageNumber, setPageNumber] = useState(1);
  const itemsOnPage = 10;

  useEffect(() => {
    store.get('catalog').load(itemsOnPage,((pageNumber - 1) * itemsOnPage));
  }, [pageNumber])

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
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Paginator 
      itemsAmount={select.totalCount}
      currentPage={pageNumber}
      callback={setPageNumber}
      range={3}
      itemsOnPage={itemsOnPage}/>
    </Layout>
  )
}

export default React.memo(Main);
