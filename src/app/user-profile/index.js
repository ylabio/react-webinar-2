import React from 'react';
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import useTranslate from "../../hooks/use-translate";
import UserInfo from "../../components/user-info";
import Tools from "../../containers/tools";
import AuthorizationPanelController
  from '../../components/authorization-panel-controller'
import useSelector from '../../hooks/use-selector'


function UserProfile() {
    const {t} = useTranslate();

    const userData = useSelector(store => store.user.userData)

    console.log(userData)

    return (
        <>
            <AuthorizationPanelController />
            <Layout head={
                <LayoutFlex flex="between">
                    <h1>{t('title')}</h1>
                </LayoutFlex>
            }>
                <Tools/>
                { userData && <UserInfo userData={userData}/> }
            </Layout>
        </>
    )
}

export default React.memo(UserProfile);
