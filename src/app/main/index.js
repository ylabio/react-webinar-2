import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination/pagination";

function Main(){

  console.log('Main');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);

  const pageSize = 10;
  const skip = (currentPage - 1) * 10;

  const store = useStore();

  async function getItems(){
    const response = await fetch(`/api/v1/articles?limit=${pageSize}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    store.setState({
      ...store.state,
      catalog: {items: json.result.items}
    })
    setItemsCount(json.result.count)
  }

  /*useLayoutEffect(() => {
    store.get('catalog').load();
  }, [])*/

  useEffect(() => {
    getItems()
  }, [currentPage])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    onPageChange: useCallback(pageIndex => {
      setCurrentPage(pageIndex);
    }, [setCurrentPage])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination itemsCount={itemsCount} pageSize={pageSize} currentPage={currentPage} onPageChange={callbacks.onPageChange}/>
    </Layout>
  )
}

export default React.memo(Main);
