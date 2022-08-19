import React, {useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import LocaleSelect from "../../containers/locale-select";
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import ProfileContent from "../../components/admin/profile-content";
import PanelLogin from "../../containers/panel-login";
import Spinner from "../../components/spinner";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  useInit(async () => {
    await store.get('login').checkLogin();
  }, [], {backForward: true});

  const select = useSelector(state => ({
    isAuth: state.login.isAuth,
    user: state.login.user,
    waiting: state.login.waiting,
  }));

  useEffect(() => {
    if (!select.isAuth) {
      navigate('/login', {replace: true});
    }
  }, [select.isAuth])

  const {t} = useTranslate();

  return (
    <Layout
      panelLogin={
        <PanelLogin />
      }
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>}
    >
      <Tools/>
      <Spinner active={select.waiting}>
        <ProfileContent user={select.user} t={t}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Profile);
