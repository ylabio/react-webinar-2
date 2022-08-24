import React, { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import AuthStatus from '../../components/auth-status';
import useSelector from '../../hooks/use-selector';

function User() {
  const store = useStore();
  const select = useSelector(state => ({
    username: state.user.user?.profile?.name,
    isAuth: state.user.isAuth,
  }));

  const { t } = useTranslate();

  const callbacks = {
    logout: useCallback(() => store.get('user').logout(), []),
  };

  return (
    <AuthStatus
      isAuth={select.isAuth}
      username={select.username}
      logout={callbacks.logout}
      t={t}
    />
  );
}

export default React.memo(User);
