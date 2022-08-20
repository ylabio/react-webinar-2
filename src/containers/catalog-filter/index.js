import React, {useCallback, useMemo} from 'react';
import Input from '../../components/common/input';
import Select from '../../components/common/select';
import LayoutFlex from '../../components/layouts/layout-flex';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.catalog.categories.map(item => ({value: item._id, title: item.title}))
  }));

  const {t, lang} = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    // Фильтр по категории
    onCategorySelect: useCallback(
      category => store.get('catalog').setParams({category, page: 1}),
      []
    ),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), [])
  };

  // Опции для полей
  const options = {
    sort: useMemo(
      () => [
        {value: 'order', title: t('sort.orderAsc')},
        {value: 'title.ru', title: t('sort.titleAsc')},
        {value: '-price', title: t('sort.priceDesc')},
        {value: 'edition', title: t('sort.editionAsc')}
      ],
      [lang]
    ),
    categories: useMemo(
      () => [{value: '*', title: t('filter.allCategories')}, ...select.categories],
      [select.categories]
    )
  };

  return (
    <LayoutFlex flex='start'>
      <Select
        onChange={callbacks.onCategorySelect}
        value={select.category}
        options={options.categories}
      />
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort} />
      <Input
        onChange={callbacks.onSearch}
        value={select.query}
        placeholder={t('search.placeholder')}
        theme='big'
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
