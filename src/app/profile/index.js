import React, {useCallback, useEffect} from "react";
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
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuth: state.login.isAuth,
    user: state.login.user,
    waiting: state.login.waiting,
  }));

  useInit(async () => {
    if (!select.isAuth) {
      navigate('/login');
    }
  }, [select.isAuth], {backForward: true});

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
