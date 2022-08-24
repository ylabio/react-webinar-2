import React, {useCallback, useMemo, useEffect} from "react";

import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layouts/layout-flex";
import Spinner from "../../components/spinner";

import categoryList from "../../utils/category-list";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categoriesArr: state.categories.categories,
    waiting: state.categories.waiting
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Выбор каталога
    onChange: useCallback(category => store.get('catalog').setParams({category, page: 1}), []),
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), [])
  };

  useEffect(() => {
    //опции для категорий
    if(select.categoriesArr.length === 0 )
      store.get('categories').setCategories(); 
  }, []);

  let cat = useMemo(() => categoryList(select.categoriesArr), [select.categoriesArr]);

  // Опции для полей сортировки
  const options = {
    sort: useMemo(() => ([
      {value:'order', title: 'По порядку'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), [])
  }

  return (
    <Spinner active={select.waiting}>
      <LayoutFlex flex="start">
        <Select onChange={callbacks.onChange} value={select.category} options={cat}/>
        <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
        <Input onChange={callbacks.onSearch} value={select.query} placeholder={t('filter.search')} theme="big"/>
        <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
      </LayoutFlex>
    </Spinner>
  );
}

export default React.memo(CatalogFilter);
