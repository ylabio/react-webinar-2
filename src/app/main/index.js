import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useMemo} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import PageControls from '../../components/page-controls';


function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').setPage(1);
  }, [])

  const select = useSelector(state => ({
    currentPage: state.catalog.currentPage,
    maxPage: state.catalog.maxPage,
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Изменение страницы
    setPage: useCallback(page => store.get('catalog').setPage(page), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  const usedItems = useMemo(() => {
    let itemsFromPage = select.items.slice((select.currentPage-1) * 10)
    let itemsForUse
    itemsFromPage.length >= 10 ? itemsForUse = itemsFromPage.slice(0, 10) : itemsForUse = itemsFromPage.slice(0, itemsFromPage.length)
    return itemsForUse
  }, [select.items, select.currentPage])

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={usedItems} renderItem={renders.item}/>
      <PageControls minPage={1} maxPage={select.maxPage} onPageChange={callbacks.setPage}/>
    </Layout>
  )
}

export default React.memo(Main);
