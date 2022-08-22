import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";
import Filter from "../../components/filter";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    filter: state.catalog.params.filter,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.category.items
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Фильтр
    onFilter: useCallback(filter => store.get('catalog').setParams({filter, page: 1}), []),
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), [])
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
      <Filter onChange={callbacks.onFilter} value={select.filter} options={select.categories}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
