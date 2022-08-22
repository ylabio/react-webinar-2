import React, { useCallback, useMemo, useEffect } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";


function CatalogFilter() {

  const store = useStore();

  useEffect(() => {
    store.get('catalog').getCategories();
  }, []);

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    currCategory: state.catalog.params.category,
    categories: state.catalog.categories,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({ sort }), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({ query, page: 1 }), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), []),
    //Selecting category
    onSelectCategory: useCallback((category) => store.get('catalog').setParams({ category, page: 1 }), []),
  };


  const categoriesList = useMemo(() => select.categories.map((category) => ({
    title: category.title,
    value: category._id,
    parentId: category.parent?._id
  })), [select.categories]);

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ]), []),
    categories: useMemo(() => ([
      { value: '', title: 'Все' },
      ...makeCategoriesTree(categoriesList),
    ]), [categoriesList])
  }

  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onSelectCategory} value={select.currCategory} options={options.categories} />
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort} />
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big" />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);


function makeCategoriesTree(categoriesList, parentId = undefined, prefix = '') {

  const categoriesTree = [];

  categoriesList.forEach((item) => {
    if (item.parentId === parentId) {
      item.title = prefix + item.title;
      categoriesTree.push(
        item,
        ...makeCategoriesTree(categoriesList, item.value, prefix + '-')
      );
    }
  });

  return categoriesTree;
}
