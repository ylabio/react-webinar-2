import React from 'react';
import {useParams} from 'react-router-dom';
import Layout from '../../components/layouts/layout';
import CommonHead from '../../containers/common-head';
import CommonTopbar from '../../containers/common-topbar';
import LoginForm from '../../containers/login-form';
import Tools from '../../containers/tools';

function Login() {
  const params = useParams();

  return (
    <Layout head={<CommonHead />} topbar={<CommonTopbar />}>
      <Tools />
      <LoginForm redirectPage={params.redirectPage} pageId={params.pageId} />
    </Layout>
  );
}

export default React.memo(Login);
