import React from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layouts/layout";
import LayoutFlex from "../../components/layouts/layout-flex";
import User from "../../containers/user";
import ProfileCard from "../../components/profile-card";
import useAuth from "../../hooks/use-auth";

function Profile() {

    const { t } = useTranslate();

    const select = useSelector((state) => ({
        token: state.user.token,
        waiting: state.user.waiting,
        user: state.user.data,
    }));

    useAuth(select.token, "/login", "/");

    return (
        <Layout
            before={
                <LayoutFlex flex="end" padding={false}>
                    <User />
                </LayoutFlex>
            }
            head={
                <LayoutFlex flex="between">
                    <h1>{t("title")}</h1>
                </LayoutFlex>
            }
        >
            <Tools />
            <Spinner active={select.waiting}>
                <ProfileCard user={select.user} t={t} />
            </Spinner>
        </Layout>
    );
}

export default React.memo(Profile);