import React, { Fragment, useCallback } from "react";
import useSelector from "../../hooks/use-selector";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginBar from "../../components/login-bar";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../containers/login-form";
import useStore from "../../hooks/use-store";


function Authorization() {

    const { t } = useTranslate();

    const select = useSelector(state => ({
        user: state.authorization.name
    }));

    const store = useStore();

    const callback = {
        exit: useCallback(() => store.get('authorization').logOut(), []),
    }


    return (<Fragment>
        <LoginBar userName={select.user} logOut={callback.exit} />
        <Layout head={
            <LayoutFlex flex="between">
                <h1>{t('title')}</h1>
                <LocaleSelect />
            </LayoutFlex>}>
            <Tools />
            <LoginForm />
        </Layout>

    </Fragment>)
}


export default React.memo(Authorization);