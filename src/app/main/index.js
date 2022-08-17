import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import CatalogApi from "../../api/catalog";
import {getPageCount} from "../../utils/getPageCount";
import {getPagesArray} from "../../utils/getPagesArray";

function Main(){

  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const fetchTotalCount = async () => {
    const response = await CatalogApi.getTotalCount()
    setTotalPages(getPageCount(response, limit))
  }
  const pagesArray = getPagesArray(totalPages)


  useEffect(() => {
    fetchTotalCount()
    store.get('catalog').load()
  }, [])

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,

  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Обновление списка товаров
    updateCatalog: useCallback((limit,skip) => store.get('catalog').load(limit,skip),[])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
      <>
        <Layout head={<h1>Магазин</h1>}>
          <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
          <List items={select.items} renderItem={renders.item}/>
          <Pagination pages={pagesArray} currentPage={currentPage} setCurrentPage={setCurrentPage} updateCatalog={callbacks.updateCatalog} />
        </Layout>

      </>

  )
}

export default React.memo(Main);
