import React, { useCallback, useMemo } from 'react';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';
import Input from '../../components/input';
import LayoutFlex from '../../components/layout-flex';

function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    currentCategory: state.catalog.params.currentCategory,
    allCategories: state.category.allCategories,
  }));

  const allCategories = select.allCategories.map(currentCategory => {
    return {
      title: currentCategory.title,
      value: currentCategory._id,
      parent: currentCategory.parent?._id,
    };
  });

  const { t } = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({ sort }), []),
    // Поиск
    onSearch: useCallback(
      query => store.get('catalog').setParams({ query, page: 1 }),
      []
    ),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), []),
    //Выбор категории
    onSelectCurrentCategory: useCallback(
      currentCategory =>
        store.get('catalog').setParams({ currentCategory, page: 1 }),
      []
    ),
  };

  function getSelectList(list, parentId = undefined, delimiter = '') {
    const selectList = [];
    list.forEach((item) => {
      if (parentId === item.parent) {
        item.title = delimiter + item.title;
        selectList.push(item);
        selectList.push(...getSelectList(list, item.value, `${delimiter}- `));
      }
    });
    return selectList;
  }

  // Опции для полей
  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      []
    ),
    allCategories: useMemo(
      () => [{ title: 'Все', value: '' }, ...getSelectList(allCategories)],
      [allCategories]
    ),
  };

  return (
    <LayoutFlex flex='start'>
      <Select
        onChange={callbacks.onSelectCurrentCategory}
        value={select.currentCategory}
        options={options.allCategories}
      />
      <Select
        onChange={callbacks.onSort}
        value={select.sort}
        options={options.sort}
      />
      <Input
        onChange={callbacks.onSearch}
        value={select.query}
        placeholder={'Поиск'}
        theme='big'
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
