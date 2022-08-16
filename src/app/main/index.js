import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import Item from "../../components/item";
import Pagination from "../../components/pagination/pagination";

function Main({store, amount, sum, items, currentPage, count}){

  console.log('Main');

  const [currPage, setCurrentPage] = useState(currentPage);

  const pageSize = 10;
  const skip = (currentPage - 1) * 10;

  useEffect(() => {
    store.get('catalog').getItemsForPage(pageSize, skip, currPage)
  }, [currentPage])

  /*useLayoutEffect(() => {
    store.get('catalog').load();
  }, [])*/

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    onPageChange: useCallback(pageIndex => {
      setCurrentPage(pageIndex);
      store.get('catalog').setCurrentPage(currPage);
    }, [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} link={`/articles/${item._id}`} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={amount} sum={sum}/>
      <List items={items} renderItem={renders.item}/>
      <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={callbacks.onPageChange}
      />
    </Layout>
  )
}

Main.propTypes = {
  store: PropTypes.object,
  amount: PropTypes.number,
  sum: PropTypes.number,
  items: PropTypes.array
}

export default React.memo(Main);
