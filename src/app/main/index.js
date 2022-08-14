import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import { routes } from "../../utils/routes";

function Main(){
  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    current: state.catalog.current,
    total: state.catalog.total,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  
  useEffect(() => {
    store.get('catalog').load(select.current)
  }, [select.current])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Кнопки пагинации
    changePage: useCallback(page => () => store.get('catalog').setPage(page), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} redirectTo={routes.ItemPage}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}
            basketControls={
              {
                onOpen: callbacks.openModalBasket,
                amount: select.amount,
                sum: select.sum
              }
            }>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination total={select.total} current={select.current} changePage={callbacks.changePage}/>
    </Layout>
  )
}

export default React.memo(Main);
