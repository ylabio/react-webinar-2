import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";
import useInit from '../../hooks/use-init';

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.items
  }));

  const {t} = useTranslate();

  useInit(async () => {
    await store.get('categories').load()
  }, [])

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    // Смена категории
    onCategoryChange: useCallback(_id => store.get('catalog').setParams({category: _id, page: 1}), []),
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
      <Select 
      onChange={callbacks.onCategoryChange} 
      value={select.category}
      options={[{value:"", title:t('category.all'), parent:undefined}, ...select.categories]}/>

      <Select 
      onChange={callbacks.onSort} 
      value={select.sort} 
      options={options.sort}/>

      <Input 
      onChange={callbacks.onSearch} 
      value={select.query} 
      placeholder={t("search.title")} 
      theme="big"/>
      
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
