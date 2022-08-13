import React, {useCallback, useEffect} from 'react';
import Controls from '../../components/controls';
import Item from '../../components/item';
import Layout from '../../components/layout';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';

function Main() {
  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    limit: state.catalog.pageLimit,
    pagesCount: state.catalog.pagesCount,
    local: state.local.dict[state.local.lang],
    lang: state.local.lang
  }));

  useEffect(() => {
    store.get('catalog').load(select.page, select.limit);
  }, [select.page]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    setPage: useCallback(page => store.get('catalog').setPage(page), []),
    setLang: useCallback(lang => store.get('local').setLang(lang), []),

    setFirstPage: useCallback(() => store.get('catalog').setPage(1), [])
  };

  const renders = {
    item: useCallback(
      item => <Item item={item} onAdd={callbacks.addToBasket} addLocal={select.local.common.add} />,
      [select.local.common.add]
    )
  };

  return (
    <Layout
      head={<h1>{select.local.catalog.header}</h1>}
      curLang={select.lang}
      setLang={callbacks.setLang}
    >
      <Controls
        onBasketOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        local={select.local}
        onHomeClick={callbacks.setFirstPage}
      />
      <List items={select.items} renderItem={renders.item} />
      <Pagination total={select.pagesCount} active={select.page} onChange={callbacks.setPage} />
    </Layout>
  );
}

export default React.memo(Main);
