import React from "react";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../containers/login-form";
import PageTemplate from "../../components/page-template";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";

function Login() {

  const {t} = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.login.user
  }));

  useInit(() => {
    if (select.user) {
      navigate('/profile', {replace: true})
    }
  }, [select.user], {backForward: true});

  return (
    <PageTemplate title={t('title')}>
      <LoginForm/>
    </PageTemplate>
  )
}

export default React.memo(Login);
