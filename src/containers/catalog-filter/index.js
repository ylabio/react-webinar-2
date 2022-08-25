import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";
import Spinner from "../../components/spinner";

function CatalogFilter() {
  
  const store = useStore();

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categories: state.categories.allcategories,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    waiting: state.categories.waiting,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Селект
    onSelectCategory: useCallback(category => store.get('catalog').setParams({category, page: 1}), []),
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), [])
  };
 
  // Опции для полей
  const options = {
    categories: useMemo(() => (
      [{ id: '*', value: '', title: 'Все'}, ...select.categories]), [select.categories]),
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
        <Select onChange={callbacks.onSelectCategory} value={select.category} options={options.categories}/>
        <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
        <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
        <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
      </LayoutFlex>
    </Spinner>
  );
}

export default React.memo(CatalogFilter);
