import React, {useCallback, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import Layout from "../../components/layout";
import AuthPanel from "../../containers/auth-panel";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import Spinner from "../../components/spinner";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import LoginForm from "../../components/login-form";
import {useNavigate, useLocation} from "react-router-dom";
import useInit from "../../hooks/use-init";

const Login = () => {
    const store = useStore();
    const {t} = useTranslate();
    const navigate = useNavigate();
    const location = useLocation();
    const select = useSelector(state => ({
        token: state.login.token,
        err: state.login.err,
        isAuth: state.login.isAuth,
        waiting: state.login.waiting,
    }));
    const callbacks = {
        logIn: useCallback(data => store.get('login').logIn(data), []),
    };
    useInit(() => {
        if (select.isAuth && location.key === 'default') {
            navigate('/', {replace: true});
        }
        if (select.isAuth && location.key !== 'default') {
            navigate(-1);
        }
    }, [select.token], {backForward: true});
    return (
        <Layout
            authPanel={<AuthPanel/>}
            head={
                <LayoutFlex flex="between">
                    <h1>{t('title')}</h1>
                    <LocaleSelect/>
                </LayoutFlex>
            }>
            <Tools/>
            <Spinner active={select.waiting}>
                <LoginForm logIn={callbacks.logIn} err={select.err} t={t}/>
            </Spinner>
        </Layout>
    );
};

export default Login;