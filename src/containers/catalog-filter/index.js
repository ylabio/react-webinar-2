import React, {useCallback, useMemo} from "react";
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

  const select = useSelector(state => ({
    sort: state.catalog.filterParams.sort,
    query: state.catalog.filterParams.query,
    category: state.catalog.filterParams.category,
    categories: state.catalog.filterOptions.categories,
    pending: state.catalog.filterOptions.pending,
  }));

  const callbacks = {
    onSort: useCallback(sort => {
      navigate(store.get('catalog').getFilterResultRoute('sort', sort));
    }, []),
    onCat: useCallback(cat => {
      navigate(store.get('catalog').getFilterResultRoute('category', cat));
    }, []),
    onSearch: useCallback(query => {
      navigate(store.get('catalog').getFilterResultRoute('query', query));
    }, []),
    onReset: useCallback(() => navigate('/catalog'), []),
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

  return (
    <Spinner active={select.pending}>
      <LayoutFlex>
        <Select onChange={callbacks.onCat} value={select.category} options={select.categories} />
        <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
        <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
        <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
      </LayoutFlex>
    </Spinner>
  );
}

export default React.memo(CatalogFilter);
