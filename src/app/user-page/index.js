import React, {useEffect, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import useSelector from "./../../hooks/use-selector";
import HeaderLogin from "./../../components/header-login"
import {useNavigate} from "react-router-dom";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import Profile from "../../components/profile";

function UserPage() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams({}, false);
  }, [], {backForward: true});

  let user = useSelector((state) => state.user);
  let token = localStorage.getItem("token");
  let navigate = useNavigate();

  useEffect(() => {
    if(token && !user.logined) store.get('user').auth(token);
  }, [token, user.logined])
  useEffect(() => {
    if(!user.logined) navigate('/login');
  }, [user.logined])

  const logout = useCallback(() => store.get('user').logOut(user));

  const {t} = useTranslate();

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }
    login={<HeaderLogin user={user} logout={logout}/>}>
      <Tools />
      <Profile user={user.user}/>
    </Layout>
  )
}

export default React.memo(UserPage);
