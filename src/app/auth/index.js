import React, { useCallback, useState } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Layout from "../../components/layouts/layout";
import LayoutFlex from "../../components/layouts/layout-flex";
import Tools from "../../containers/tools";
import AuthPage from "../../components/auth-page";
import Login from "../../containers/login";
import LocaleSelect from "../../containers/locale-select";

function Auth() {
    const store = useStore();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const { logErr } = useSelector(state => ({
        logErr: state.auth.logErr
    }));

    const { t } = useTranslate();

    const callbacks = {
        //установка логина
        handleLoginChange: useCallback((e) => setLogin(e.target.value), []),
        //установка пароля
        handlePasswordChange: useCallback((e) => setPassword(e.target.value), []),
        //отправка данных на сервер
        onSubmit: useCallback(async (e) => {
            e.preventDefault();
            await store.get('auth').login({ login, password })
        })
    };

    return (
        <Layout head={
            <>
                <Login />
                <LayoutFlex flex="between">
                    <h1>{t('title')}</h1>
                    <LocaleSelect />
                </LayoutFlex>
            </>
        }>
            <Tools />
            <AuthPage onSubmit={callbacks.onSubmit}
                handleLoginChange={callbacks.handleLoginChange}
                handlePasswordChange={callbacks.handlePasswordChange}
                logErr={logErr} />
        </Layout>
    )
}

export default React.memo(Auth);
