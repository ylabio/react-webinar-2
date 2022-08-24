import React, {useCallback, useEffect, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";
import SelectCategory from "../../components/select_category";
import {categories, categoriesArr} from '../../utils/counter'

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.catalog.categories
  }));

  const {t} = useTranslate();

  useEffect(() => {
    callbacks.inputParams()
    callbacks.inputCategories()
  }, [])

  categoriesArr(select.categories)

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), []),
    // Сортировка по категориям
    onSortCategory: useCallback(category => store.get('catalog').setParams({category}), []),

    inputParams: useCallback(() => store.get('catalog').initParams(), []),

    inputCategories: useCallback(() => store.get('catalog').initCategories(), []),
    
  };

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value:'order', title: 'По порядку'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), []),
    sortCategory: useMemo(() => categoriesArr(select.categories).map(item => {
      return {value: item._id, title: item.title}
    }), [select.categories]),
   }

  return (
    <LayoutFlex flex="start">
      <SelectCategory onChange={callbacks.onSortCategory} value={select.category} options={options.sortCategory}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
