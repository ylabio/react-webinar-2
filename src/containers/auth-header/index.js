import React, { useCallback } from 'react'
import { Link } from 'react-router-dom';
import ProfileHead from '../../components/profile-head';
import LayoutFlex from '../../components/wrappers/layout-flex';
import LayoutLink from '../../components/wrappers/layout-link';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

export default function AuthHeader() {
  const store = useStore();

  const select = useSelector(state => ({
    session: state.session,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Выход из авторизации
    logout: useCallback(() => store.get('session').logout(select.session.token), [select.session.token]),
  };
  return (
    <LayoutFlex flex="end" padding={false} center={true}>
      {select.session.isLogged
        ? <ProfileHead
          logout={callbacks.logout}
          name={select.session.name} />
        : <LayoutLink><Link to='/login'>{t('auth.login')}</Link></LayoutLink>
      }
    </LayoutFlex >
  )
}

React.memo(AuthHeader);