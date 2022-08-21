import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';
import ProfileHead from '../../components/profile-head';
import LayoutFlex from '../../components/wrappers/layout-flex';
import LayoutLink from '../../components/wrappers/layout-link';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

export default function AuthHeader() {
  const store = useStore();

  const select = useSelector(state => ({
    auth: state.auth,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Выход из авторизации
    logout: useCallback((token) => store.get('auth').logout(token), []),
    // Получение данных профиля
    loadProfile: useCallback((token) => store.get('auth').loadProfile(token), [])
  };
  return (
    <LayoutFlex flex="end" padding={false} center={true}>
      {select.auth.isLogin
        ? <ProfileHead
          logout={callbacks.logout}
          loadProfile={callbacks.loadProfile}
          name={select.auth.name}
          token={select.auth.token} />
        : <LayoutLink><Link to="/login">{t('auth.login')}</Link></LayoutLink>
      }
    </LayoutFlex >
  )
}

React.memo(AuthHeader);