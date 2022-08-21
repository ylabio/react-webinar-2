import React, {useCallback, useEffect} from 'react';
import Layout from '../../components/layouts/layout';
import LayoutFlex from '../../components/layouts/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import AuthHeader from '../../containers/auth-header';
import UserCard from '../../components/user-card';
import useTranslate from '../../hooks/use-translate';
import Tools from "../../containers/tools";
import { useAuth } from './../../hooks/use-auth';
import { useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";

function UserPage() {
  const {t} = useTranslate();
  const store = useStore();
  
  const {user, isAuth} = useAuth(); 
  const navigate = useNavigate();
console.log(user);

  useInit(async () => {
    await store.get('auth').setSelf();
    isAuth ? navigate('/profile') : navigate('/');
  }, [isAuth], {backForward: true});

	// useEffect(()=>{
	// },[isAuth])

  return (
    <Layout
      userInfo={<AuthHeader link='/profile'/>}
      head={
        <LayoutFlex flex='between'>
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <UserCard userInfo={user}/>
    </Layout>
  );
}

export default UserPage;
