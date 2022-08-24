import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import Header from '../../components/header';
import Spinner from '../../components/spinner';
import Logout from '../../components/logout';

function HeaderContainer({ title = 'title' }) {
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

  const renders = {
    loginOrLogout: useCallback(() => {
      return !select.isAuth ? (
        <Link to="/login">
          <button>{t('auth.login')}</button>
        </Link>
      ) : (
        <Logout
          userName={select.userName}
          logout={callbacks.logout}
          waiting={select.waiting}
          t={t}
        />
      );
    }, [select.isAuth, select.userName]),
  };

  return (
    <Spinner active={select.waiting}>
      <Header title={t(title)} loginOrLogout={renders.loginOrLogout} />
    </Spinner>
  );
}

export default React.memo(HeaderContainer);
