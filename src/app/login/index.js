import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
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

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (select.isSigned) {
      const redirect = location.state.redirect;
      const id = location.state.id;
      navigate(`/${redirect}${id ? '/' + id : ''}`);
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
