import React from 'react';
import LayoutFlex from '../../components/layouts/layout-flex';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import {useAuth} from './../../hooks/use-auth';
import useTranslate from '../../hooks/use-translate';
import { useNavigate } from "react-router-dom";


const AuthHeader = () => {
  const cn = bem('AuthHeader');
  const {t} = useTranslate();
  const navigate = useNavigate();

  const {isAuth} = useAuth();

  return (
    <div className={cn()}>
      <LayoutFlex flex='end' padding={false}>
        {isAuth ? (
          <>
            <Link to={'/userinfo'}>username</Link>
            <button>{t('auth.quit')}</button>
          </>
        ) : (
          <button onClick={()=> navigate('login')}>{t('auth.enter')}</button>
        )}
      </LayoutFlex>
    </div>
  );
};

export default AuthHeader;
