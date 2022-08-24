import React, {useCallback, useEffect, useMemo, useState} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";


const CATEGORY_PREFIX = '-';
const appendChildCategory = (items, rootItem, categoryPrefix = CATEGORY_PREFIX) => {
  const childs = items.filter(item => item?.parent?._id === rootItem._id);
  if (childs.length === 0) {
    return [];
  }

  return childs.reduce((categories, child) => {
    return [
      ...categories,
      {value: child._id, title: categoryPrefix + ' ' + child.title},
      ...appendChildCategory(items, child, categoryPrefix + CATEGORY_PREFIX),
    ]
  }, [])
}

const createOptionsCategory = (items) => {
  const optionsCategory = items.filter(item => !item.parent)
  return optionsCategory.reduce((categories, rootCategory) => {
    return [
      ...categories,
      {value: rootCategory._id, title: rootCategory.title},
      ...appendChildCategory(items, rootCategory),
    ]
  }, [{value: '', title: 'Все'}]);
}

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
  }));

  console.log(select.category)

  const {t} = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    //Выбор категории
    onChangeCategory: useCallback(category => store.get('catalog').setParams({category}), []),
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

  // const [items, setItems] = useState([]);
  // useEffect(() => {
  //       fetch( `/api/v1/categories`)
  //           .then(response => response.json())
  //           .then(category => {
  //             setItems(createOptionsCategory(category.result.items))
  //             console.log(category)
  //           });
  // }, []);


//черновик с неработающей фигней
  const [items, setItems] = useState([]);
  useEffect(() => {
   const list = store.get('catalog').getCatalogCategory();
    setItems(createOptionsCategory(select.category.result))
    console.log(list.result)
  }, [])

  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onChangeCategory} value={select.category} options={items}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
