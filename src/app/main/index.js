import List from '../../components/list';
import React, { useCallback, useEffect } from 'react';
import Item from '../../components/item';
import useStore from '../../utils/hooks/use-store';
import useSelector from '../../utils/hooks/use-selector';
import useLang from '../../utils/hooks/use-lang';
import Pagination from '../../components/pagination';
import CommonLayout from '../../containers/common-layout';

function Main() {
  const { item: itemLn } = useLang();
  // console.log('Main');
  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, []);

  const select = useSelector((state) => ({
    items: state.catalog.items,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} ln={itemLn} />,
      [itemLn]
    ),
  };

  return (
    <CommonLayout>
      <List items={select.items} renderItem={renders.item} />
      <Pagination />
    </CommonLayout>
  );
}

export default React.memo(Main);
