import React, {useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginTop from "../../containers/login-top";
import {useNavigate} from "react-router-dom";
import UserCard from "../../components/user-card";
import Spinner from "../../components/spinner";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.user.user,
    userExists: state.user.userExists,
    waiting: state.user.waiting,
  }));

  useInit(async () => {
    if (!select.userExists) {
      navigate(`/login`, {replace: true});
    }
  }, [select.userExists]);

  return (
    <Layout 
    head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }
    login={
      <LoginTop/>
    }>
      <Tools/>
      <Spinner active={select.waiting}>
        <UserCard user={select.user} t={t}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Profile);
