import React, {useCallback, useEffect, useMemo, useState} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.catalog.categories, 
    category: state.catalog.params.category
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    //смена категории
    onCategoryChange: useCallback(_id => store.get('catalog').setParams({category: _id, page: 1}), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), []),
    getCategories: useCallback(() => store.get('catalog').getCategories(),[])
  };

  const [categories, setCategories] = useState(   [{value:'', title: "Все", parent:undefined}])
  useEffect(() => {
    callbacks.getCategories().then(newCategories => setCategories(newCategories))
  }, [])

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value:'order', title: 'По порядку'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), []),
  }

  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onCategoryChange} value={select.category} options={categories}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
