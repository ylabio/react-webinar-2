import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";

function Main(){
  const store = useStore();
  const [page, setPage] = React.useState(1);
  const itemsLimit = 10;

  useEffect(() => {
    store.get('catalog').load(itemsLimit, (page - 1) * itemsLimit);
  }, [page]);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalAmount: state.catalog.totalAmount,
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
      <Pagination
        currentPage={page}
        itemsLimit={itemsLimit}
        amount={select.totalAmount}
        setPage={setPage}
      />
    </Layout>
  )
}

export default React.memo(Main);
