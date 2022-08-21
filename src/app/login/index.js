import React, {useCallback, useState} from "react";
import useTranslate from "../../hooks/use-translate";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Input from "../../components/input";
import Field from "../../components/field";
import ToolsContainer from "../../containers/tools";
import TopContainer from "../../containers/top";
import HeadContainer from "../../containers/head";
import {useLocation, useNavigate} from "react-router-dom";

function Login() {

  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    login: '',
    password: ''
  });

  const callbacks = {
    onChange: useCallback((value, name) => {
      setData(prevData => ({...prevData, [name]: value}));
    }, []),

    onSubmit: useCallback((e) => {
      e.preventDefault();
      // Возврат на страницу, с которой пришли
      const back = location.state?.back && location.state?.back !== location.pathname
        ? location.state?.back
        : '/';
      navigate(back);

    }, [data, location.state])
  };

  const {t} = useTranslate();

  return (
    <Layout>
      <TopContainer/>
      <HeadContainer/>
      <ToolsContainer/>

      <LayoutFlex>
        <form onSubmit={callbacks.onSubmit}>
          <h2>{t('auth.title')}</h2>
          <Field label={t('auth.login')}>
            <Input name="login" onChange={callbacks.onChange}
                   value={data.login}/>
          </Field>
          <Field label={t('auth.password')}>
            <Input name="password" type="password" onChange={callbacks.onChange}
                   value={data.password}/>
          </Field>
          <Field error={''}/>
          <Field>
            <button type="submit">{t('auth.signIn')}</button>
          </Field>
        </form>
      </LayoutFlex>

    </Layout>
  )
}

export default React.memo(Login);
