import React, { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import LayoutFlex from '../../components/layout-flex';
import LoginLink from '../../components/login-link';
import LogoutLink from '../../components/logout-link';
import useTranslate from '../../hooks/use-translate';

function UserMenu() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    user: state.profile.user,
    isLogged: state.profile.isLogged,
  }));

  const callbacks = {
    // выход из профиля
    onLogout: useCallback((token) => store.get('profile').onLogout(token), []),
  };

  const links = {
    loginLink: '/login',
    profileLink: '/profile',
  };

  return (
    <>
      <LayoutFlex flex="end" bg="white" padding={true}>
        {select.isLogged ? (
          <LogoutLink
            lableButton={t('user-menu.logout')}
            userName={select.user.name}
            onOut={callbacks.onLogout}
            link={links.profileLink}
          />
        ) : (
          <LoginLink
            lableButton={t('user-menu.login')}
            link={links.loginLink}
          />
        )}
      </LayoutFlex>
    </>
  );
}

export default React.memo(UserMenu);
