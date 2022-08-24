import React, {useEffect} from "react";
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import useSelector from "../../hooks/use-selector";
import ProfileCard from "../../components/profile-card";
import useStore from "../../hooks/use-store";

function Profile() {
    const store = useStore()

    useEffect(() => {
        store.get('user').getCurrentUser()
    }, [])

    const select = useSelector(state => ({
        profile: state.user.profile
    }))

    return (
        <Layout head={
            <LayoutFlex flex="start">
                <h1>Магазин</h1>
            </LayoutFlex>
        }>
            <Tools/>
            <LayoutFlex flex="start">
                <ProfileCard profile={select.profile}/>
            </LayoutFlex>
        </Layout>
    )
}

export default React.memo(Profile)