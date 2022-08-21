import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LayoutGrid from "../../components/layout-grid";
import HeaderSign from '../../components/header_sign'
import Form from "../../components/form";

function Sign(){
    const store = useStore();
  
    const {t} = useTranslate();

    const token = localStorage.getItem('token')


    const select = useSelector(state => ({
      login: state.form.login,
      password: state.form.password,
      result: state.form.result,
      error: state.form.result?.error?.data?.issues[0]?.message
    }));

    const callbacks = {
      inputLogin: useCallback((login) => store.get('form').inputLogin(login), []),
      inputPassword: useCallback((password) => store.get('form').inputPassword(password), []),
      fetchLogin: useCallback(() => store.get('form').login(), []),
      fetchLogout:  useCallback((token) => store.get('form').logout(token), []),
    };

  return (
    <Layout head={
        <LayoutGrid flex="between">
          <HeaderSign 
            logout={callbacks.fetchLogout} 
            result={select.result?.result} 
            profile={token ? token : select?.result?.result?.token}/>
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
          result={select.result?.result}
        />
      </Layout>
  )
}

export default React.memo(Sign);
