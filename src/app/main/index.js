import React from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import Tools from '../../containers/tools';
import Layout from '../../components/layout';
import HeaderContainer from '../../containers/header-container';

function Main() {
  const store = useStore();

  useInit(
    async () => {
      await store.get('catalog').initParams();
      await store.get('categories').loadCategories();
    },
    [],
    { backForward: true }
  );

  return (
    <Layout head={<HeaderContainer />}>
      <Tools />
      <CatalogFilter />
      <CatalogList />
    </Layout>
  );
}

export default React.memo(Main);
