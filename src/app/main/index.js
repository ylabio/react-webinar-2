import React, {useEffect} from 'react';
import Layout from '../../components/layouts/layout';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import CommonHead from '../../containers/common-head';
import CommonTopbar from '../../containers/common-topbar';
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
    store.get('categories').load();
  }, []);

  return (
    <Layout head={<CommonHead />} topbar={<CommonTopbar redirectPage={''} />}>
      <Tools />
      <CatalogFilter />
      <CatalogList />
    </Layout>
  );
}

export default React.memo(Main);
