import React, {useEffect} from 'react';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function Main() {
  const store = useStore();

  useInit(
    async () => {
      await store.get('catalog').initParams();
    },
    [],
    {backForward: true}
  );

  const {t} = useTranslate();

  useEffect(() => {
    store.get('catalog').loadCategories();
  }, []);

  return (
    <Layout
      head={
        <LayoutFlex flex='between'>
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <CatalogFilter />
      <CatalogList />
    </Layout>
  );
}

export default React.memo(Main);
