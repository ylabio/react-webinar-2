import React from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Layout from "../../components/layouts/layout";
import LayoutFlex from "../../components/layouts/layout-flex";
import Tools from "../../containers/tools";
import ProfilePage from "../../components/profile-page";
import LocaleSelect from "../../containers/locale-select";

function Profile() {
    const store = useStore();

    const { data } = useSelector(state => ({
        data: state.auth.profileData
    }));

    const { t } = useTranslate();

    useInit(async () => {
        await store.get('auth').loadProfile();
    }, [], { backForward: false });

    return (
        <Layout head={
            <>
                <LayoutFlex flex="between">
                    <h1>{t('title')}</h1>
                    <LocaleSelect />
                </LayoutFlex>
            </>
        }>
            <Tools />
            <ProfilePage name={data?.profile?.name} phoneNum={data?.profile?.phone} email={data?.email} />
        </Layout>
    )
}

export default React.memo(Profile);
