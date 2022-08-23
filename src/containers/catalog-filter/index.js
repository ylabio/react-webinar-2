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
    categories: state.catalog.categories
  }));

  // console.log(parser(select.categories))

  const {t} = useTranslate();
  

  const callbacks = {
    // Сортировка
    onSort: useCallback((sort, type) => {store.get('catalog').setParams({sort}, type) }, []),
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


    const id = typeof select.sort.split('&')[1] === 'undefined'? null : select.sort.split('&')[1].slice(17);
    const initCategoryValue = parser(select.categories).filter(item => item.id === id)[0].value


  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onSort} value={initCategoryValue} options={parser(select.categories)}/>
      <Select onChange={callbacks.onSort} value={select.sort.split('&')[0]} options={optionsSorting.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
