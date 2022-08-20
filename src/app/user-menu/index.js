import React, { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import LayoutFlex from '../../components/layout-flex';
import LoginLink from '../../components/login-link';
import LogoutLink from '../../components/logout-link';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';

function UserMenu() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    user: state.profile.user,
    isLogged: state.profile.isLogged,
    directTo: state.profile.directTo,
  }));

  useInit(() => {
    store.get('profile').initUser(JSON.parse(localStorage.getItem('user')));
  }, [select.isLogged]);

  const callbacks = {
    // проверка профиля
    checkUser: useCallback(
      (token) => store.get('profile').checkUser(token),
      []
    ),
    // выход из профиля
    onLogout: useCallback((token) => store.get('profile').onLogout(token), []),
    resetState: useCallback(() => store.get('profile').resetState(), []),
    resetRedirect: useCallback(() => store.get('profile').resetRedirect(), []),
  };

  const links = {
    loginLink: '/login',
    profileLink: '/profile',
  };

  return (
    <LayoutFlex flex="end" bg="white" padding={true}>
      {select.isLogged ? (
        <LogoutLink
          lableButton={t('user-menu.logout')}
          checkUser={callbacks.checkUser}
          resetState={callbacks.resetState}
          userName={select.user.name}
          onOut={callbacks.onLogout}
          directTo={select.directTo}
          resetRedirect={callbacks.resetRedirect}
        />
      ) : (
        <LoginLink lableButton={t('user-menu.login')} link={links.loginLink} />
      )}
    </LayoutFlex>
  );
}

export default React.memo(UserMenu);
