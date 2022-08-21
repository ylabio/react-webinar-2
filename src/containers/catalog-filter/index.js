import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";

function CatalogFilter() {

  const IsReset = true
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.catalog.categories,
    category: state.catalog.params.category
  }));
  const {t} = useTranslate();
  console.log(select.category)
  console.log(select.sort)
  const callbacks = {
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    onFilter: useCallback(category => store.get('catalog').setParams({category, page: 1}), []),
    onReset: useCallback(() => store.get('catalog').resetParams(), []),
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), [])
  };

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value:'order', title: 'По порядку'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), [])
  }

  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onFilter} categoryReset={IsReset} value={select.category} options={select.categories} />
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
