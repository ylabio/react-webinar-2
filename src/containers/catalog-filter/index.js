import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";
import parser from "../../utils/select-parser";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.select.categories,
    category: state.catalog.params.category,
  }));

  const category = parser(select.categories).filter(item => item.id === select.category).length === 0
  ? 'all'
  : parser(select.categories).filter(item => item.id === select.category)[0].value

  const {t} = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback((sort, type) => {
      if(type === 'category'){
        const category = parser(select.categories).filter(item => item.value === sort)[0].id
        store.get('catalog').setParams({category}) 
      }
      store.get('catalog').setParams({sort}) 
    }, [select.categories]),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), [])
  };

  // Опции для полей
  const optionsSorting = {
    sort: useMemo(() => ([
      {value:'order', title: 'По порядку', type: 'sort'},
      {value:'title.ru', title: 'По именованию', type: 'sort'},
      {value:'-price', title: 'Сначала дорогие', type: 'sort'},
      {value:'edition', title: 'Древние', type: 'sort'},
    ]), [])
  }


  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onSort} value={category} options={parser(select.categories)}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={optionsSorting.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
