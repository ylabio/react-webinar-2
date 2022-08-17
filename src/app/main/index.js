import React, {useCallback, useEffect, useState} from "react";
import List from "../../components/list";
import Layout from "../../components/layout";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import BasketSimple from "../../components/basket-simple";
import Menu from "../../components/menu";
import Controls from "../../components/controls";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main(){

  console.log('Main');

  const store = useStore();
  const itemsPerPage = 10;

  const select = useSelector(state => ({
    items: state.catalog.items,
    lastViewedPage: state.catalog.currentPage,
    maxCount: state.catalog.maxCount,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const [page, setPage] = useState(select.lastViewedPage);

  useEffect(() => {
    store.get('itemInfo').clearState();
  }, []);

  useEffect(() => {
    store.get('catalog').load(itemsPerPage, (page - 1) * itemsPerPage);
    store.get('catalog').rememberPaginationInfo(page, itemsPerPage);
  }, [page]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} link={`/info/${item._id}`} onAdd={callbacks.addToBasket}/>, []),
  };

  const lastPage = Math.ceil(select.maxCount/itemsPerPage);

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls>
        <Menu main={'Главная'}/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Controls>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination currentPage={page} setPage={setPage} lastPage={lastPage}/>
    </Layout>
  );
};

export default React.memo(Main);
