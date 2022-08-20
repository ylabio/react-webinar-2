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
    category: state.catalog.params.category
  }));

  const {t} = useTranslate();

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

  const [categories, setCategories] = useState([{value:'', title: t("category.all"), parent:undefined}])
  
  useEffect(() => {
      const fetchCategories = async() => {
      const response = await fetch("api/v1/categories?lang=ru&&skip=0&fields=title,_id,parent&sort=parent")
      const json = await response.json()
      const categories = json["result"]["items"]
      const newCategories = [{value: '', title: t("category.all"), parent: undefined}]
      // Результат в массиве
      for (let category of categories) {
        newCategories.push({value: category._id, title: category.title, parent: category.parent?._id})
      }

      // Добавление иерархии
      for (let category of newCategories) {
        let parent = category.parent
        while(parent) {
            category.title = ' - '+category.title
            parent = newCategories.find(category => category.value === parent).parent
        }
      }
      // Сортировка по иерархии
      for (let idx = 0; idx < newCategories.length; idx ++) {
        if(newCategories[idx].parent) {
          const parentIdx = newCategories.findIndex((cat) => cat.value === newCategories[idx].parent)
          newCategories.splice(parentIdx+1, 0, newCategories[idx])
          newCategories.splice(idx+1, 1)
        }
      }
      return newCategories
    }

    fetchCategories().then(newCategories => setCategories(newCategories))
  }, [])

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
              options={categories}/>

      <Select 
              onChange={callbacks.onSort} 
              value={select.sort} 
              options={options.sort}/>

      <Input  
              onChange={callbacks.onSearch} 
              value={select.query} 
              placeholder={t("search.title")} theme="big"/>

      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
