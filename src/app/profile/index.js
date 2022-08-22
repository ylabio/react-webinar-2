import React, { useEffect, useState, useCallback} from "react";
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

  const [response, setResponse] = useState('');

  const select = useSelector(state => ({
    name: state.user.name,
  }));
  
  useEffect(() => {
    const load = async () => {
      const res = await api.get('/users/self/');
      setResponse(res);
      store.get('user').setName(res.data.result.profile.name)
    };

    if(getToken()) load()
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
      {response && getToken() ? <Data response={response} t={t}/> : null}
    </Layout>
  )
}

export default React.memo(Profile);
