import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import BasketSimple from "../../components/basket-simple";
import Item from "../../components/item";
import List from "../../components/list";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";

function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const select = useSelector(state => ({
    articleRoute: state.article.articleRoute,
    artQty: state.catalog.items.length,
    pagItems: state.catalog.pagItems,
    pagSel: state.catalog.pagSel,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переход по элементу пагинации
    pagSurf: useCallback(pagSel => store.get('catalog').pagSurf(pagSel), [])
  };

  const renders = {
    item: useCallback(item =>
      <Item item={item} onAdd={callbacks.addToBasket} articleRoute={select.articleRoute}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.pagItems} renderItem={renders.item}/>
      <Pagination artQty={select.artQty} pagSel={select.pagSel} pagSurf={callbacks.pagSurf}/>
    </Layout>
  )
}

export default React.memo(Main);
