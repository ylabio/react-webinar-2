import React, { useCallback, useEffect, useState } from 'react';
import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Pagination from '../../components/pagination';

function Shop({ setTitle }) {
  const store = useStore();

  useEffect(() => {
    setTitle('Магазин');
  }, []);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    count: state.catalog.count,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),

    loadCatalog: useCallback((skip) => store.get('catalog').load(skip)),
  };

  const renders = {
    item: useCallback((item) => <Item item={item} onAdd={callbacks.addToBasket} />, []),
  };

  return (
    <>
      <List items={select.items} renderItem={renders.item} />
      <Pagination items={select.items} count={select.count} loadCatalog={callbacks.loadCatalog} />
    </>
  );
}

export default React.memo(Shop);
