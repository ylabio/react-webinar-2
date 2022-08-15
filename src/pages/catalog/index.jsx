import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/loading';
import Error from '../../components/error';
import List from "../../components/list";
import Item from "../../components/item";
import Pagination from '../../components/pagination';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

const Catalog = () => {
  const store = useStore();
  const currentPage = useParams().page;

  useEffect(() => {
    store.get('catalog').fetchPageItems(currentPage);
  }, [currentPage])

  const select = useSelector(state => ({
    pageItems: state.catalog.pageItems,
    fetchState: state.catalog.fetchState,
    pagesCount: state.catalog.pagesCount,
  }));

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} />, []),
  };

  const callbacks = {
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (select.fetchState === 'pending'
    ? <Loading />
    : select.fetchState === 'error'
      ? <Error />
      : select.fetchState === 'ok'
        ? <>
          <List items={select.pageItems} renderItem={renders.item} />
          <Pagination pagesCount={select.pagesCount} />
        </>
        : <Error />
  );
};

export default React.memo(Catalog);