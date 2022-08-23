import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LoginForm from "../../components/login-form";
import useStore from "../../hooks/use-store";
import { useNavigate } from "react-router-dom";

function Authorization(){

    const store = useStore();
    const navigate = useNavigate()

    const selector = useSelector(state => ({
        isAuth: state.auth.isAuth,
        error: state.auth.error}));

    const callbacks = {
        // Закрытие любой модалки
        login: useCallback((login, password) => store.get('auth').login(login, password), []),
        goProfile: useCallback(() => navigate('/profile'))
      };

    const {t} = useTranslate();

    return(
        <Layout isAuth={selector.isAuth} head={
            <LayoutFlex flex="between">
              <h1>{t('title')}</h1>
              <LocaleSelect/>
            </LayoutFlex>
          }>
          <Tools />
          <LoginForm login={callbacks.login} error={selector.error} goProfile={callbacks.goProfile}/>  
          </Layout>
    )
}

export default React.memo(Authorization)