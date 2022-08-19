import React, {useCallback} from 'react';
import AuthorizationPanel from "../../components/authorization-panel";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import AuthorizationForm from "../../components/authorization-form";
import Tools from "../../containers/tools";
import useStore from "../../hooks/use-store";


function Authorization() {
    const store = useStore();

    const callbacks = {
        getUserToken: useCallback((params) => store.get('user').getUserToken(params), [])
    }

    const {t} = useTranslate();

    return (
        <>
            <AuthorizationPanel/>
            <Layout head={
                <LayoutFlex flex="between">
                    <h1>{t('title')}</h1>
                    <LocaleSelect/>
                </LayoutFlex>
            }>
            <Tools/>
            <AuthorizationForm onSubmit={callbacks.getUserToken}/>
            </Layout>
        </>
    )
}

export default React.memo(Authorization);