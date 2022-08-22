import React, {useCallback, useEffect, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";
import useInit from "../../hooks/use-init";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    options: state.categories.options,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), []),

    onSortCategory: useCallback(category => store.get('catalog').setParams({category, page: 1}), []),
  };

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value:'order', title: 'По порядку'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), []),
    categories: [{value:'', title: 'Все'}].concat(select.options),
  }
console.log('AAAAAAAAAAAAAAA', options.categories)

  useInit(async () => {
    await store.get('categories').getCategories();
  }, []);

  return (
    <LayoutFlex flex="start">
      <Select onChange={callbacks.onSortCategory} value={select.category} options={options.categories}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);


/*
useMemo(() => ([
      {value:'', title: 'Все'},
      {value:'62fde67bfa639a32847b3d65', title: 'Электроника'},
      {value:'62fde67bfa639a32847b3d66', title: '- Телефоны'},
      {value:'62fde67bfa639a32847b3d6d', title: '-- Смартфоны'},
      {value:'62fde67bfa639a32847b3d6e', title: '--- Аксессуары'},
      {value:'62fde67bfa639a32847b3d67', title: '- Ноутбуки'},
      {value:'62fde67bfa639a32847b3d68', title: '- Телевизоры'},
      {value:'62fde67bfa639a32847b3d69', title: 'Книги'},
      {value:'62fde67bfa639a32847b3d6a', title: '- Учебники'},
      {value:'62fde67bfa639a32847b3d6b', title: '- Художественная'},
      {value:'62fde67bfa639a32847b3d6c', title: '- Комиксы'},
    ]), []),



temp1.filter(v => !v.parent).map(v => fn(temp1, v, [])).reduce((acc, v) => [...acc, ...v], []).map(v => ({value: v._id, title: v.hash + v.title}));
*/