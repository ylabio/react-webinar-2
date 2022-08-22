import React from 'react';
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import ProfileContent from "../../components/profile-content";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Nav from "../../containers/nav";

const Profile = () => {
    const selector = useSelector(state => ({
        user: state.auth.user,
        token: state.auth.token,
        name: state.auth.name
    }));
    const {t} = useTranslate();
    console.log(selector.user);
    return (
        <Layout nav={<Nav/>} name={selector.name} token={selector.token} head={
            <LayoutFlex flex="between">
                <h1>{t('title')}</h1>
            </LayoutFlex>

        }>
            <Tools/>
            <ProfileContent email={selector.user.email} name={selector.user.profile.name}
                            phone={selector.user.profile.phone}/>
        </Layout>
    );
};

export default Profile;