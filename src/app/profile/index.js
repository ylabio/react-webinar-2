import React, { useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Data from "../../components/profile";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import api from "../../services/api";
import {getToken, removeToken} from "../../services/token";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    name: state.user.name,
    phone: state.user.phone,
    email: state.user.email,
  }));
  
  useEffect(() => {
    if (getToken()) store.get('user').setData();
  }, [])

  useEffect(() => {
    if(!getToken()) navigate(`/login`)
  }, [select.name])

  const callbacks = {
    removeToken: useCallback(() => store.get('user').logout(), []),
  };

  return (
    <Layout t={t} name={select.name} removeToken={callbacks.removeToken} head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      {select.name ? <Data name={select.name} phone={select.phone} email={select.email} t={t}/> : null}
    </Layout>
  )
}

export default React.memo(Profile);
