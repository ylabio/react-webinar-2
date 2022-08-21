import React, {useCallback} from 'react';
import useStore from '../../hooks/use-store';
import LayoutFlex from '../../components/layouts/layout-flex';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import {useAuth} from './../../hooks/use-auth';
import useTranslate from '../../hooks/use-translate';
import {useNavigate, useLocation} from 'react-router-dom';

const AuthHeader = ({link}) => {
  const cn = bem('AuthHeader');
  const {t} = useTranslate();

  const store = useStore();
  const navigate = useNavigate();

  const {isAuth, user, token} = useAuth();

  const callbacks = {
    // Добавление в корзину
    logout: useCallback(() => store.get('auth').removeUser(token), []),
  };

  const onClick = () => {
    localStorage.setItem('link', link)
    navigate('/login')
  }

  return (
    <div className={cn()}>
      <LayoutFlex flex='end' padding={false}>
        {isAuth ? (
          <>
            <Link to={'/profile'}>{user.username}</Link>
            <button onClick={callbacks.logout}>{t('auth.quit')}</button>
          </>
        ) : (
          <button onClick={onClick}>{t('auth.enter')}</button>
        )}
      </LayoutFlex>
    </div>
  );
};

export default AuthHeader;
