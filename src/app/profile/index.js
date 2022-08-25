import React, { Fragment, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginBar from "../../components/login-bar";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import ProfileForm from "../../containers/profile-form";

function Profile() {

    const navigate = useNavigate();
    const store = useStore();
    const { t } = useTranslate();


    const select = useSelector(state => ({
        user: state.authorization.name
    }));

    useInit(async () => {
        (window.localStorage.length === 0 && navigate('/login'));
        ((window.localStorage.length && !select.user) && navigate("/"));
    }, [select.user]);

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
            <ProfileForm />
        </Layout>

    </Fragment>)
}


export default React.memo(Profile);