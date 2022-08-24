import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";
import getCategoryHierarchy from '../../utils/category-hierarchy'

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    allCategories: state.categories.allCategories
  }));

  const allCategories = select.allCategories.map((category) => {
    return { title: category.title, value: category._id, parent: category.parent?._id };
  });

  const {t} = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), []),
    // Смена категории
    onChangeCategory: useCallback((category) => store.get('catalog').setParams({category, page: 1}), []),
  };



  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value:'order', title: 'По порядку'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), []),
    allCategories: useMemo(() => [{ title: 'Все', value: '' }, ...getCategoryHierarchy(allCategories)], [allCategories]),
  };

  return (
    <LayoutFlex flex="start">
      <Select
        onChange={callbacks.onChangeCategory}
        value={select.category}
        options={options.allCategories}
      />
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort} />
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big" />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
