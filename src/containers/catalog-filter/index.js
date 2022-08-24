import React, {useCallback, useEffect, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";

function CatalogFilter() {

  const store = useStore();

  const findParentCategory = (parentCategory, obj) => {
    if(parentCategory in obj) {
      return obj[parentCategory]
    }

    for(let category in obj) {
      if(obj[category].children) {
        if(parentCategory in obj[category].children) {
          return obj[category].children[parentCategory];
        } else {
          return findParentCategory(parentCategory, obj[category].children)
        }
      }
    }
  }

  const makeHierarchicallyArray = (arr, obj, depth = 0) => {
    arr.push({...obj, title: `${obj.title}`.padStart(obj.title.length + depth, "-")})
    if(obj.children) {
      depth++;
      for(let c in obj.children) {
        makeHierarchicallyArray(arr, obj.children[c], depth);
      }
    }
    return arr;
  }

  useEffect(() => {
    store.get("categories").loadCategories();
  }, [])

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.categories,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Сортировка по категории
    onChangeCategory: useCallback(category => store.get('catalog').setParams({category, page: 1}), []),
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
    ]), []),
    categories: useMemo(() => {

      let categoryObj = {
        "all": {value: "", title: "Все"}
      };

      select.categories.map((category) => categoryObj[category._id] = {value: category._id, title: category.title, parent: category.parent});
      for(let category in categoryObj) {
        if(categoryObj[category].parent) {
          let parent = findParentCategory(categoryObj[category].parent._id, categoryObj);
          delete categoryObj[category].parent;
          parent.children = parent.children !== undefined ? {...parent.children} : {};
          parent.children[category] = {...categoryObj[category]};
          delete categoryObj[category];
        }
      }
      let arr = [];
      for(let c in categoryObj) {
        makeHierarchicallyArray(arr, categoryObj[c], 0)
      }
      return arr;
    }, [select.categories])
  }

  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onChangeCategory} value={select.category} options={options.categories}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
/*
<Select onChange={callbacks.onChangeCategory} value={select.category} options={options.categories}/>
<Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
*/