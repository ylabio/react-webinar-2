import React from 'react';
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Layout from "../../components/layout";
import useTranslate from "../../hooks/use-translate";
import LoginCard from "../../components/login-card";
import Input from "../../components/input";
import LoginInput from "../../components/login-input";
import Nav from "../../containers/nav";
import useSelector from "../../hooks/use-selector";

const Login = () => {
    const {t} = useTranslate();

    const select = useSelector(state => ({
        token: state.auth.token
    }));

    return (

        <Layout nav={<Nav/>} head={
                <LayoutFlex flex="between">
                    <h1>{t('title')}</h1>
                </LayoutFlex>
        }>
            <Tools/>
            <LoginCard title={t('login.title')}/>
        </Layout>

    );
};

export default Login;