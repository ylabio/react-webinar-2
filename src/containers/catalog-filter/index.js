import React, {useCallback, useEffect, useMemo, useState} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.catalog.categories, 
    category: state.catalog.params.category
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    //смена категории
    onCategoryChange: useCallback(_id => store.get('catalog').setParams({category: _id, page: 1}), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), []),
    getCategories: useCallback(() => store.get('catalog').getCategories(),[]),
    
  };

  const categoryList = function() {
    const categories = select.categories
    const newCategories = [{value: '', title: 'Все', parent: undefined}]

    for (let category of categories) {
      newCategories.push({value: category._id, title: category.title, parent: category.parent?._id})
    }

    for (let category of newCategories) {
      let parent = category.parent
      while(parent) {
          category.title = ' - '+category.title
          parent = newCategories.find(category => category.value === parent).parent
      }
    }

    for (let id = 0; id < newCategories.length; id ++) {
      if(newCategories[id].parent) {
        const parentId = newCategories.findIndex((c) => c.value === newCategories[id].parent)
        newCategories.splice(parentId + 1, 0, newCategories[id])
        newCategories.splice(id+1, 1)
      }
    }
    return newCategories 
  }

  useEffect(() => {
    callbacks.getCategories()
  }, [])

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
      <Select onChange={callbacks.onCategoryChange} value={select.category} options={categoryList()}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
