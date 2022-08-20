import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import ProfilePage from "../../components/profile-page";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();
  const { user } = useSelector(state => state.auth);

  const callbacks = {
    signOut: useCallback(() => {
      store.get('auth').setUserData({user: null, token: null});
      navigate('/login');
    }, []),
  }

  return (
    <Layout 
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
        </LayoutFlex>}
      handleAuth={callbacks.signOut}
      userData={user?.profile?.name}
      signOut={callbacks.signOut}
    >
      <Tools />
      <ProfilePage userData={user} />
    </Layout>
  );
}

export default React.memo(Profile);