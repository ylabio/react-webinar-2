import React, {useCallback, useEffect} from 'react';
import Item from '../../components/item';
import Layout from '../../components/layout';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import Controls from '../controls';

function Main() {
  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.page,
    limit: state.catalog.pageLimit,
    pagesCount: state.catalog.pagesCount,
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
    // Установка страницы
    setPage: useCallback(page => store.get('catalog').setPage(page), []),
    setFirstPage: useCallback(() => store.get('catalog').setPage(1), []),
    // Установка языка
    setLang: useCallback(lang => store.get('local').setLang(lang), [])
  };

  // Переводчик статического текста
  const t = (path, amount = null) => store.get('local').translate(path, amount);

  const renders = {
    item: useCallback(
      item => <Item item={item} onAdd={callbacks.addToBasket} text={{add: t('common.add')}} />,
      [select.lang]
    )
  };

  return (
    <Layout head={<h1>{t('catalog.header')}</h1>} curLang={select.lang} setLang={callbacks.setLang}>
      <Controls />
      <List items={select.items} renderItem={renders.item} />
      <Pagination total={select.pagesCount} active={select.page} onChange={callbacks.setPage} />
    </Layout>
  );
}

export default React.memo(Main);
