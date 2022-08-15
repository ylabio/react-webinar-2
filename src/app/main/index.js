import React, {useCallback, useEffect, useState} from "react";
import List from "../../components/list";
import Layout from "../../components/layout";
import Basket from ".././basket";
import BasketSimple from "../../components/basket-simple";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main(){

  console.log('Main');

  const store = useStore();
  const modal = useSelector(state => state.modals.name);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    store.get('catalog').load(itemsPerPage, (page - 1) * itemsPerPage);
    store.get('itemInfo').clearState();
  }, [page])

  const select = useSelector(state => ({
    items: state.catalog.items,
    maxCount: state.catalog.maxCount,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Загрузка через api конкретного item-а с помощью id
    loadInfo: useCallback(_id => store.get('itemInfo').loadInfo(_id), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  const lastPage = Math.ceil(select.maxCount/itemsPerPage)

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination currentPage={page} setPage={setPage} lastPage={lastPage}/>
      {modal === 'basket' && <Basket/>}
    </Layout>
  )
}

export default React.memo(Main);
