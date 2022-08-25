import React, { useCallback, useEffect, useMemo, useState } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";
import { getCategoryItems } from "../../utils/category";

function CatalogFilter() {
  const [categoriesArray,setCategoriesArray]= useState([])
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.category.categories,
    auth: state,
  }));
console.log(select.auth);
useEffect(() => {
  setCategoriesArray(select.categories.map(category => {
    return { title: category.title, value: category._id, parent: category.parent?._id }
  }))
}, [select.categories])

  const { t } = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({ sort }), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({ query, page: 1 }), []),
    // Сброс
    onReset: useCallback(() => store.get('category').resetParams(), []),
    onSelectCategory: useCallback(category => store.get('catalog').setParams({ category, page: 1 }), []),
  };

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ]), []),
    categories: useMemo(() => ([
      { title: 'Все', value: '' },
      ...getCategoryItems(categoriesArray)
    ]), [categoriesArray])
  }
  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onSelectCategory} value={select.category} options={options.categories} />
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort} />
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big" />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
