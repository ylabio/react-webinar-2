import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../../components/profile-page";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import { getUserDataFromLS } from "../../utils";
import Layout from '../../components/layouts/layout';
import LayoutFlex from '../../components/layouts/layout-flex';

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();
  const { user } = useSelector(state => state.auth);

  const callbacks = {
    signOut: useCallback(() => {
      const token = getUserDataFromLS().token;
      store.get('auth').signOut(token);
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
      link='/profile'
    >
      <Tools />
      <ProfilePage userData={user} />
    </Layout>
  );
}

export default React.memo(Profile);