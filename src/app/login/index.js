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
    isSigned: state.session.isSigned
  }));

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (select.isSigned) {
      let redirect;
      let id;
      if (location.state) {
        redirect = location.state.redirect;
        id = location.state.id;
      } else {
        redirect = 'profile';
      }
      navigate(`/${redirect}${id ? '/' + id : ''}`, {replace: true});
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
