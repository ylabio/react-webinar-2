import React, { useCallback, useMemo } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";

import categories from "../../utils/categories";
import Button from "../../components/button";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.categories.categories,
    currentCategory: state.catalog.params.category,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({ sort }), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({ query, page: 1 }), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), []),
    onCategoryChange: useCallback(category => store.get('catalog').setParams({ category, page: 1 }), []),
  };

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ]), []),
    category: useMemo(() => ([
      { value: '', title: 'Все' },
      ...categories(select.categories)
    ]), [select.categories]),

  }

  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort} />
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big" />
      <Button onClick={callbacks.onReset} text={t('filter.reset')} type={'reset'} />
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
