import React from 'react';
import useSelector from "../../hooks/use-selector";
import AuthPanel from "../../containers/auth-panel";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import ProfileContent from "../../components/profile-content";

const Profile = () => {


    const select = useSelector(state => ({
        isAuth: state.login.isAuth,
        user: state.login.user,
        waiting: state.login.waiting,
    }));


    const {t} = useTranslate();
    return (
            <Spinner active={select.waiting}>
        <Layout
            authPanel={<AuthPanel/>}
            head={
                <LayoutFlex flex="between">
                    <h1>{t('title')}</h1>
                    <LocaleSelect/>
                </LayoutFlex>
            }>
            <Tools/>

                <ProfileContent user={select.user} t={t}/>
        </Layout>
            </Spinner>
    );
};

export default React.memo(Profile);