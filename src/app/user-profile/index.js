import React, {useState, useEffect, useCallback} from 'react';
import AuthorizationPanel from "../../components/authorization-panel";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import useTranslate from "../../hooks/use-translate";
import UserInfo from "../../components/user-info";
import Tools from "../../containers/tools";
import useStore from "../../hooks/use-store";


function UserProfile() {
    const {t} = useTranslate();

    const store = useStore();

    return (
        <>
            <AuthorizationPanel/>
            <Layout head={
                <LayoutFlex flex="between">
                    <h1>{t('title')}</h1>
                </LayoutFlex>
            }>
                <Tools/>
                <UserInfo token={store.getState().user.token}/>
            </Layout>
        </>
    )
}

export default React.memo(UserProfile);