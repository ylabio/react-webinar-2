import React, { useCallback, useMemo, useState, useEffect } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";

function CatalogFilter() {
  const store = useStore();
  const callbacks = {
    onCategory: useCallback(category => store.get('catalog').setParams({ category, page: 1 }), []),
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({ sort }), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({ query, page: 1 }), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), []),
    // Получить категорию
    getCategory: useCallback(() => store.get('catalog').getCategory(), []),
  };
  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categoryItems: state.catalog.categoryItems,
  }));
  useEffect(() => {
    callbacks.getCategory()

  }, [])
  const { t } = useTranslate();


  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      { _id: 'order', title: 'По порядку' },
      { _id: 'title.ru', title: 'По именованию' },
      { _id: '-price', title: 'Сначала дорогие' },
      { _id: 'edition', title: 'Древние' },
    ]), []),
  }

  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onCategory} value={select.category} options={select.categoryItems} />
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort} />
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big" />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
