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
        user: state.authorization.name,
        profile: state.authorization
    }));

    useInit(async () => {
        (window.localStorage.length === 0 && navigate('/login'));
        (!select.user && navigate("/"));
    }, [select.profile]);

    const callback = {
        exit: useCallback(() => store.get('authorization').logOut(), []),
    }

    const { name, email, phone } = select.profile


    return (<Fragment>
        <LoginBar userName={name} logOut={callback.exit} />
        <Layout head={
            <LayoutFlex flex="between">
                <h1>{t('title')}</h1>
                <LocaleSelect />
            </LayoutFlex>}>
            <Tools />
            <ProfileForm name={name} email={email} phone={phone} />
        </Layout>

    </Fragment>)
}


export default React.memo(Profile);