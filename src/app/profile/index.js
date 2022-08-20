import ProfileUser from "components/profile-user";
import Header from "containers/header";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";

function Profile() {

  const navigate = useNavigate();
  const select = useSelector(state => ({
    isInitialize: state.auth.isInitialize,
    userName: state.auth.user.username,
    userPhone: state.auth.user.profile.phone,
    userEmail: state.auth.user.email,
    isLogin: state.auth.isLogin,
  }));

  useEffect(()=> {
  if(!select.isLogin) {
    navigate('/login')
  }
},[select.isLogin])

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>Магазин</h1>
        <LocaleSelect/>
      </LayoutFlex>
    } menu={<Header/>}>
      <Tools/>
        <ProfileUser name={select.userName} phone={select.userPhone}
                     email={select.userEmail}/>
    </Layout>
  )
}

export default Profile;
