import React from 'react';
import Layout from '../../components/layouts/layout';
import CommonHead from '../../containers/common-head';
import CommonTopbar from '../../containers/common-topbar';
import Tools from '../../containers/tools';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function Profile() {
  const store = useStore();

  const {t} = useTranslate();

  return (
    <Layout head={<CommonHead />} topbar={<CommonTopbar />}>
      <Tools />
    </Layout>
  );
}

export default React.memo(Profile);
