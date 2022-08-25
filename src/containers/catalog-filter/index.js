import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    cats: state.categories.cats,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    cat_id: state.catalog.params.cat_id
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Сортировка по
    // Категории
    onCat: useCallback( cat_id => store.get('catalog').setParams({cat_id, page: 1}), []),
    // Порядку
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    // Сброс
    onResetCatalog: useCallback(() => store.get('catalog').resetParams(), [])
  };

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
      <Select onChange={callbacks.onCat} value={select.cat_id} options={select.cats}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onResetCatalog}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
