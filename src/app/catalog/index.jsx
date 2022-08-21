import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import LayoutPage from '../../layouts/layout-page';
import LayoutFlex from '../../layouts/layout-flex';
import Tools from '../../containers/tools';
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import UserPreview from '../../containers/user-preview';

const Catalog = () => {
  const store = useStore();
  const location = useLocation();
  const { t } = useTranslate();

  useEffect(() => {
    store.get('catalog').fetchPageItems(location);
    store.get('catalog').fetchFilterOptions();
  }, [location]);

  return (
    <LayoutPage head={<>
      <UserPreview />
      <LayoutFlex place='row-between'>
        <h1>{t('title')}</h1>
        <LocaleSelect />
      </LayoutFlex>
    </>}>
      <Tools />
      <CatalogFilter />
      <CatalogList />
    </LayoutPage>
  )
};

export default React.memo(Catalog);