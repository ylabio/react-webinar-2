import React, {useEffect} from "react";
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import useSelector from "../../hooks/use-selector";
import ProfileCard from "../../components/profile-card";
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";

function Profile() {
    const store = useStore()
    const token = localStorage.getItem('access-token')
    const history = useNavigate()

    useEffect(() => {
        if (token) {
            store.get('user').getCurrentUser()
        }else {
            history('/login', {replace: true})
        }
    }, [token])

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