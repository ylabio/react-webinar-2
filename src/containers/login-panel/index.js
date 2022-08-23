import React, { useCallback } from 'react';
import LayoutFlex from '../../components/layout-flex';
import LoginTools from '../../components/login-tools';
import useAuth from '../../hooks/use-auth';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';

const LoginPanel = () => {
  const store = useStore();
  const { user } = useAuth();

  useInit(
    async () => {
      await store.get('user').checkAuth();
    },
    [],
    { backForward: true }
  );

  const callbacks = {
    logout: useCallback(() => store.get('user').logout(), []),
  };

  return (
    <LayoutFlex flex={'end'} padding={false}>
      <LoginTools userName={user.profile?.name} onLogout={callbacks.logout} />
    </LayoutFlex>
  );
};

export default React.memo(LoginPanel);
