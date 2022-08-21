import React, {useEffect} from 'react';
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import useInit from "../../hooks/use-init";
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
    const store = useStore();
    const navigate = useNavigate();

    useInit(async () => {
        await store.get('login').checkLogin();
    }, [], {backForward: true});

    const select = useSelector(state => ({
        isAuth: state.login.isAuth,
        user: state.login.user,
        waiting: state.login.waiting,
    }));

    useEffect(() => {
        if (!select.isAuth) {
            navigate('/login', {replace: true});
        }
    }, [select.isAuth])

    const {t} = useTranslate();
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
                <ProfileContent user={select.user} t={t}/>
            </Spinner>
        </Layout>
    );
};

export default Profile;