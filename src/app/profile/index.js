import React, {useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {Navigate, useParams} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LayoutGrid from "../../components/layout-grid";
import HeaderSign from '../../components/header_sign'
import UserInfo from "../../components/user_info";

function Profile(){
    const store = useStore();

    const token = localStorage.getItem('token')

    useEffect(() => {
      callbacks.getToken(token)
    }, [])
  
    const {t} = useTranslate();

    const select = useSelector(state => ({
      result: state.form.result,
      surname: state.form.result?.result?.user?.profile?.surname,
      user: state.form.result
    }));
    const callbacks = {
      inputLogin: useCallback((login) => store.get('form').inputLogin(login), []),
      inputPassword: useCallback((password) => store.get('form').inputPassword(password), []),
      fetchLogin: useCallback(() => store.get('form').login(), []),
      fetchLogout:  useCallback(() => store.get('form').logout(), []),
      getToken: useCallback((token) => store.get('form').loadProfile(token), []),
    };
    
    if(!token) return <Navigate to={`/login`} />

  return (
    <Layout head={
        <LayoutGrid flex="between">
          <HeaderSign 
            logout={callbacks.fetchLogout} 
            result={select.result.result} 
            profile={select.surname}
          />
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutGrid>
      }>
        <Tools/>
        <UserInfo result={select.result}/>
      </Layout>
  )
}

export default React.memo(Profile);
