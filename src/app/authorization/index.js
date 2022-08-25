import React, {useCallback, useEffect, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LoginForm from "../../components/login-form";
import useStore from "../../hooks/use-store";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

function Authorization(){

    const store = useStore();
    const {isAuth} = useAuth()
    const navigate = useNavigate();

    const select =  useSelector(state => ({
        error: state.auth.error}))

    const callbacks = {
        // Закрытие любой модалки
        login: useCallback((login, password) => store.get('auth').login(login, password), []),
        goProfile: useCallback(() => {
          if(history.length < 3 || !isAuth) {
            navigate('/profile')
          } else {
            navigate(-1)
          } }, []),
      };

    const {t} = useTranslate();

    return(
        <Layout head={
            <LayoutFlex flex="between">
              <h1>{t('title')}</h1>
              <LocaleSelect/>
            </LayoutFlex>
          }>
          <Tools />
          <LoginForm login={callbacks.login} error={select.error} goProfile={callbacks.goProfile}/>  
          </Layout>
    )
}

export default React.memo(Authorization)