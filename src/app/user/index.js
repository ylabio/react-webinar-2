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

function UserPage() {
  const {t} = useTranslate();
  const {user, isAuth} = useAuth(); 
  const navigate = useNavigate();


	useEffect(()=>{
		isAuth ? navigate('/profile') : navigate('/');
	},[isAuth])

  return (
    <Layout
      userInfo={<AuthHeader />}
      head={
        <LayoutFlex flex='between'>
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      {isAuth && <UserCard userInfo={user}/>}
    </Layout>
  );
}

export default UserPage;
