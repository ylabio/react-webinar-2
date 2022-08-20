import React from 'react';
import Layout from '../../components/layouts/layout';
import CommonHead from '../../containers/common-head';
import CommonTopbar from '../../containers/common-topbar';
import LoginForm from '../../containers/login-form';
import Tools from '../../containers/tools';

function Login() {
  return (
    <Layout head={<CommonHead />} topbar={<CommonTopbar />}>
      <Tools />
      <LoginForm />
    </Layout>
  );
}

export default React.memo(Login);
