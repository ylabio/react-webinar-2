import React, { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import Header from '../../components/header';
import Spinner from '../../components/spinner';

function LoginContainer({ title = 'title' }) {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    userId: state.profile.data._id,
    userName: state.profile.data.name,
    isAuth: state.auth.isAuth,
    waiting: state.auth.waiting,
  }));

  const callbacks = {
    logout: useCallback(() => store.get('auth').logout(), []),
  };

  return (
    <Spinner active={select.waiting}>
      <Header
        isAuth={select.isAuth}
        title={t(title)}
        userName={select.userName}
        logout={callbacks.logout}
        t={t}
        disabledLogout={select.waiting}
      />
    </Spinner>
  );
}

export default React.memo(LoginContainer);
