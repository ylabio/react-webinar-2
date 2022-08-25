import React, { Fragment, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginBar from "../../components/login-bar";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../containers/login-form";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import { useLocation } from 'react-router-dom';


function Authorization() {

    const location = useLocation();

    const navigate = useNavigate();

    const { t } = useTranslate();

    const select = useSelector(state => ({
        user: state.authorization.name,
        productID: state.article.data._id
    }));



    const store = useStore();

    useInit(async () => {
        await store.get('authorization').choiceProfile();
        ((select.user && location.state === "product") && navigate(`/articles/${select.productID}`));
        ((select.user && !location.state) && navigate('/'));
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
            <LoginForm />
        </Layout>

    </Fragment>)
}


export default React.memo(Authorization);