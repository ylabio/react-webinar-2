import React, {useCallback, useEffect, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";


const CATEGORY_PREFIX = '- ';
const appendChildCategory = (items, rootItem, categoryPrefix = CATEGORY_PREFIX) => {
  const childes = items.filter(item => item?.parent?._id === rootItem._id);
  if (childes.length === 0) {
    return [];
  }

  return childes.reduce((categories, child) => {
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

  const rawCategoryItems = useSelector(state => state.category.categoryList);
  const categoryItems = useMemo(() => {
    return createOptionsCategory(rawCategoryItems)
  }, [rawCategoryItems])
  useEffect(() => {
    store.get('category').load();
  }, [])

  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onChangeCategory} value={select.category} options={categoryItems}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
