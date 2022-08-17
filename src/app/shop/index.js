import React, { useCallback, useEffect, useState } from 'react';
import List from '../../components/list';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Pagination from '../../components/pagination';
import propTypes from 'prop-types';
import { ITEMS_ON_PAGE } from '../../utils/render-data';

function Shop({ setTitle }) {
  const store = useStore();

  useEffect(() => {
    setTitle('Магазин');
  }, []);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    count: state.catalog.count,
    activePage: state.catalog.activePage,
  }));

  function countSkip() {
    return (select.activePage - 1) * ITEMS_ON_PAGE;
  }

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),

    loadCatalog: useCallback((skip) => store.get('catalog').load(skip)),
    countSkip: useCallback(() => countSkip(), [select.activePage]),
    setActivePage: useCallback((page) => store.get('catalog').setActivePage(page)),
  };

  useEffect(() => {
    callbacks.loadCatalog(callbacks.countSkip());
  }, [select.activePage]);

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} link={item._id} />,
      []
    ),
  };
  return (
    <>
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        count={select.count}
        activePage={select.activePage}
        setActivePage={callbacks.setActivePage}
      />
    </>
  );
}

Shop.propTypes = {
  setTitle: propTypes.func.isRequired,
};

export default React.memo(Shop);
