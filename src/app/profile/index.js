import ProfileUser from "components/profile-user";
import Spinner from "components/spinner";
import Header from "containers/header";
import useInit from "hooks/use-init";
import useStore from "hooks/use-store";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";

function Profile() {

  const store = useStore();
  const navigate = useNavigate();

  useInit(async () => {
    await store.get('profile').self();
  }, []);


  const select = useSelector(state => ({
    isInitialize: state.auth.isInitialize,
    user: state.profile.user,
    waiting: state.profile.waiting,
    isLogin: state.auth.isLogin,
  }));

  useEffect(()=> {
  if(!select.isLogin && !select.isInitialize) {
    navigate('/login');
  }
},[select.isLogin]);

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>Магазин</h1>
        <LocaleSelect/>
      </LayoutFlex>
    } menu={<Header/>}>
      <Tools/>
      <Spinner active={select.waiting}>
        <ProfileUser user={select.user}/>
      </Spinner>
    </Layout>
  )
}

export default Profile;
