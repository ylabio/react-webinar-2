import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import Spinner from '../../components/spinner';
import Item from '../../components/item';

function CatalogList() {

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
    link: state.catalog.link,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Пагинация
    onPaginate: useCallback(page => store.get('catalog').setParams({ page }), []),
  };

  const renders = {
    item: useCallback(item => (
      <Item item={item} onAdd={callbacks.addToBasket} link={`/articles/${item._id}`} labelAdd={t('article.add')} />
    ), [t]),
    link: useCallback(number => (
      <Link to={`/?page=${number}&` + select.link}>{number}</Link>
    ), [select.link]),
  };

  return (
    <Spinner active={select.waiting}>
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        count={select.count}
        page={select.page}
        limit={select.limit}
        onChange={callbacks.onPaginate}
        renderLink={renders.link}
        link={true}
      />
    </Spinner>
  );
}

export default React.memo(CatalogList);
