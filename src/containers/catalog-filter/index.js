import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/form-components/select";
import Input from "../../components/form-components/input";
import LayoutFlex from "../../components/layouts/layout-flex";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

function CatalogFilter() {
  
  const store = useStore();
  
  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.categories.categories,
    category: state.catalog.params.category,
  }));
  
  const {t} = useTranslate();
  
  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Сортировка
    onCategory: useCallback(category => store.get('catalog').setParams({category, page: 1}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), [])
  };
  
  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    categories: useMemo(() => ([
      {value: '', title: 'Все'},
      ...treeToList(listToTree(select.categories), ((item, level) => ({
        value: item._id,
        title: '- '.repeat(level) + item.title
      })))
    ]), [select.categories]),
  }
  
  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onCategory} value={select.category} options={options.categories}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={t('filter.search')} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  )
}

export default React.memo(CatalogFilter);
