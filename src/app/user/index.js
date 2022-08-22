import React, {useEffect, useCallback} from "react";
import { useNavigate } from "react-router";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginControl from "../../components/login-control";
import LoginForm from "../../components/login-form";





function User(){
    const store = useStore();
    const navigate = useNavigate();

    const select = useSelector(state => ({
      autorization: state.autorization.autorization,
      error: state.autorization.error,
      user: state.autorization.user
    }));

    useEffect(() => {
      if (select.autorization) {
        navigate("/profile", { replace: true });
      }
    }, [select.autorization])

    const callbacks = {
      onLogOut: useCallback(() => store.get('autorization').logOut(), []),
      onLogin: useCallback((login, password) => store.get('autorization').setLogin(login, password), []),
    };

    const {t} = useTranslate();
    
    return(
        <>
          <LoginControl 
            t={t} 
            userName={select.user.profile ? select.user.profile.name : null}
            onLogOut={callbacks.onLogOut}/>
          <Layout head={
            <LayoutFlex flex="between">
              <h1>{t('title')}</h1>
              <LocaleSelect/>
            </LayoutFlex>
            }>
            <Tools/>
            <LoginForm t={t} onLogin={callbacks.onLogin} error={select.error}/>
          </Layout>
        </>
        
    )
}

export default React.memo(User)