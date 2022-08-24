import React, { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

import LayoutFlex from '../../layouts/layout-flex';
import Spinner from '../../components/spinner';
import Select from "../../components/select";
import Input from "../../components/input";

function CatalogFilter() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  useEffect(() => {
    store.get('filterOptions').fetchCategories();
  }, []);

  const select = useSelector(state => ({
    pending: state.filterOptions.fetchState.pending,
    categories: state.filterOptions.categories,
    category: state.catalog.filterParams.category,
    sort: state.catalog.filterParams.sort,
    query: state.catalog.filterParams.query,
  }));

  const callbacks = {
    changeSort: useCallback(sort => {
      navigate(store.get('catalog').getFilterResultRoute('sort', sort));
    }, []),
    changeCategory: useCallback(category => {
      navigate(store.get('catalog').getFilterResultRoute('category', category));
    }, []),
    changeSearch: useCallback(query => {
      navigate(store.get('catalog').getFilterResultRoute('query', query));
    }, []),
    reset: useCallback(() => navigate('/catalog'), []),
  };

  const options = {
    sort: useMemo(() => ([
      {value:'order', title: 'По порядку'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), [])
  };

  return (
    <Spinner active={select.pending}>
      <LayoutFlex>
        <Select onChange={callbacks.changeCategory} value={select.category} options={select.categories} />
        <Select onChange={callbacks.changeSort} value={select.sort} options={options.sort}/>
        <Input onChange={callbacks.changeSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
        <button onClick={callbacks.reset}>{t('filter.reset')}</button>
      </LayoutFlex>
    </Spinner>
  );
}

export default React.memo(CatalogFilter);
