import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Layout from '../../components/layouts/layout';
import CommonHead from '../../containers/common-head';
import CommonTopbar from '../../containers/common-topbar';
import LoginForm from '../../containers/login-form';
import Tools from '../../containers/tools';
import useSelector from '../../hooks/use-selector';

function Login() {
  const select = useSelector(state => ({
    isSigned: state.auth.isSigned
  }));

  const {redirectPage, pageId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (select.isSigned) {
      const page = redirectPage ? redirectPage : '';
      const id = pageId ? '/' + pageId : '';
      navigate(`/${page}${id}`);
    }
  }, [select.isSigned]);

  return (
    <Layout head={<CommonHead />} topbar={<CommonTopbar />}>
      <Tools />
      <LoginForm />
    </Layout>
  );
}

export default React.memo(Login);
