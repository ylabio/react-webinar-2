import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Translate from '../../components/translate';
import Pagination from "../../components/pagination";
import ProgressBar from "../../components/ui/progress-bar";

function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    pagination: state.catalog.pagination,
    amount: state.basket.amount,
    loading: state.catalog.loading,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Загрузка товара при пагинации
    loadPage: useCallback((pageNum) => store.get('catalog').loadPage(pageNum), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} link={`/article/${item._id}`} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1><Translate>Магазин</Translate></h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {select.loading ? <ProgressBar /> :
        <>
          <List items={select.items} renderItem={renders.item}/>
          <Pagination pagination={select.pagination} loadPage={callbacks.loadPage}/>
        </>
      }
    </Layout>
  )
}

export default React.memo(Main);
