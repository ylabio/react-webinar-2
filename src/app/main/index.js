import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import React, { useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Pagination from '../../components/pagination';
import propTypes from 'prop-types';

function Main({ onOpen, amount, sum, addToBasket }) {
  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, []);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const renders = {
    item: useCallback((item) => <Item item={item} onAdd={addToBasket} />, []),
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItem = select.items.slice(firstItem, lastItem);
  const totalItems = select.items.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={onOpen} amount={amount} sum={sum} />
      <List items={currentItem} renderItem={renders.item} />
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        paginate={paginate}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
    </Layout>
  );
}

    Main.propTypes = {
      onOpen: propTypes.func,
      amount: propTypes.number,
      sum: propTypes.number,
      addToBasket: propTypes.func,
    };

    Main.defaultProps = {
      onOpen: () => {},
      amount: 0,
      sum: 0,
      addToBasket: () => {},
    };


export default React.memo(Main);
