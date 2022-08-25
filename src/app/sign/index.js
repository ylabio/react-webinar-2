import React, {useCallback, useEffect, useState} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LayoutGrid from "../../components/layout-grid";
import HeaderSign from '../../components/header_sign'
import {Navigate} from "react-router-dom";
import Form from "../../components/form";

function Sign(){
  const store = useStore();
  const {t} = useTranslate();

  const [link, setLink] = useState()

  const token = localStorage.getItem('token')

  useEffect(() => {
    if(token) {
      callbacks.getToken(token)
    }
  }, [token])

  const select = useSelector(state => ({
    login: state.form.login,
    password: state.form.password,
    result: state.form.result,
    surname: state.form.result?.result?.user?.profile?.surname,
    error: state.form.result?.error?.data?.issues[0]?.message,
  }));

  useEffect(() => {
    if(select.result.result?.profile?.surname) {
      setLink(true)
    }
  }, [select.result.result?.profile?.surname])

  const callbacks = {
    inputLogin: useCallback((login) => store.get('form').inputLogin(login), []),
    inputPassword: useCallback((password) => store.get('form').inputPassword(password), []),
    fetchLogin: useCallback(() => store.get('form').login(), []),
    fetchLogout:  useCallback((token) => store.get('form').logout(token), []),
    getToken: useCallback((token) => store.get('form').loadProfile(token), []),
    reset:  useCallback(() => store.get('form').resetForm(), []),
  };




  // if(link) return <Navigate to={`/profile/${select?.result?.result?.profile?.surname}`} />
  
  if(link) return <Navigate to={`/profile/${select?.result?.result?.profile?.surname}`} />

  return (
    <Layout head={
        <LayoutGrid flex="between">
          <HeaderSign 
            logout={callbacks.fetchLogout} 
            result={select.result?.result} 
            profile={select.surname}/>
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutGrid>
        
      }>
        <Tools/>
        <Form
          toLogin={callbacks.inputLogin}
          toPassword={callbacks.inputPassword}
          login={select.login}
          password={select.password}
          fetchLogin={callbacks.fetchLogin}
          error={select.error}
          reset={callbacks.reset}
          result={select.result?.result}
        />
      </Layout>
  )
}

export default React.memo(Sign);
