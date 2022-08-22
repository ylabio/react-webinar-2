import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";
import categoriesToHierarchy from "../../utils/categories-to-hierarchy";

function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    categories: state.catalog.categories,
    category: state.catalog.params.category,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Выбор категории
    onCategory: useCallback(category => store.get('catalog').setParams({category, page: 1}), []),
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), [])
  };

  // Опции для полей
  const options = {
    category: useMemo(() => {
      const result = [{value: '', title: 'Все'}];
      // Если категории не подгрузились, возвращаем массив по-умолчанию, иначе сортируем, добавляем в массив и возвращаем 
      if (!select.categories) return result;
      return result.concat(categoriesToHierarchy(select.categories));
    }, [select.categories]),
    sort: useMemo(() => ([
      {value:'order', title: 'По порядку'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), [])
  }

  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onCategory} value={select.category} options={options.category}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
