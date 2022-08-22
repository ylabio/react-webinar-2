import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import Header from '../../components/header';

function LoginContainer({ title = 'title' }) {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    userId: state.profile.data._id,
    userName: state.profile.data.name,
    isAuth: state.login.isAuth,
  }));

  const callbacks = {
    logout: useCallback(() => store.get('login').logout(), []),
  };

  return (
    <Header
      isAuth={select.isAuth}
      title={t(title)}
      userName={select.userName}
      userId={select.userId}
      logout={callbacks.logout}
    />
  );
}

export default React.memo(LoginContainer);
