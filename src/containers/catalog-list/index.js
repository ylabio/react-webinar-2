import React, {useCallback} from 'react';
import Item from '../../components/catalog/item';
import List from '../../components/common/list';
import Pagination from '../../components/common/pagination';
import Spinner from '../../components/common/spinner';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import {generateUrl} from '../../utils/generate-url';

function CatalogList() {
  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    count: state.catalog.count,
    waiting: state.catalog.waiting
  }));

  const {t} = useTranslate();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Пагианция
    generateLink: useCallback(
      page =>
        generateUrl('/', [
          {key: 'page', value: page},
          {key: 'limit', value: select.limit},
          {key: 'sort', value: select.sort},
          {key: 'query', value: select.query},
          {key: 'category', value: select.category}
        ]),
      []
    ),
    onPaginate: useCallback(page => store.get('catalog').setParams({page}), [])
  };

  const renders = {
    item: useCallback(
      item => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          link={`/articles/${item._id}`}
          labelAdd={t('article.add')}
        />
      ),
      [t]
    )
  };

  return (
    <Spinner active={select.waiting}>
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        count={select.count}
        page={select.page}
        limit={select.limit}
        generateLink={callbacks.generateLink}
        onChange={callbacks.onPaginate}
      />
    </Spinner>
  );
}

export default React.memo(CatalogList);
