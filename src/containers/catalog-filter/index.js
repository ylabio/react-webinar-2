import React, {useCallback, useEffect, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";

function CatalogFilter() {

  const store = useStore();

  const findParentCategory = (parentCategory, arr, child) => {
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].children) {
        let findedParent = arr[i].children.find((c1) => {
          return ((c1.value === parentCategory._id) || (c1.value === parentCategory.value))
        })
        if(findedParent) {
          findedParent.children = findedParent.children ? [...findedParent.children, {...child}] : [{...child}];
          return findedParent
        }
        findParentCategory(parentCategory, arr[i].children)
      }
    }
  }

  const makeHierarchicallyArray = (category, arr, depth) => {
    if(category.title) {
      category.title = category.title.padStart(category.title.length + depth, "-");
      arr.push(category);
    }
    if(category.children) {
      ++depth;
      category.children.map((c1) => {
        makeHierarchicallyArray(c1, arr, depth);
      })
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
      let hierarchicallyCategory = [];
      let categoryArr = [
        {value: "", title: "Все"}
      ];

      select.categories.map((category) => categoryArr.push({value: category._id, title: category.title, parent: category.parent}));

      categoryArr = categoryArr.map((category) => {
        if(category.parent) {
          let parentCategory = categoryArr.find((c) => {
            return c.value === category.parent._id
          });

          parentCategory.children = parentCategory.children ? [...parentCategory.children, {...category}] : [{...category}];
        }
        return category
      })
      console.log(categoryArr);
      for(let category of categoryArr) {
        if(category.parent) {
          findParentCategory(category.parent, categoryArr, category);
        } else hierarchicallyCategory.push(category)
      }
      console.log(hierarchicallyCategory);
      categoryArr = [];

      hierarchicallyCategory.map((category) => {
        makeHierarchicallyArray(category, categoryArr, 0)
      })

      return categoryArr;
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
