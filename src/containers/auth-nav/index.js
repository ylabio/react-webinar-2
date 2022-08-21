import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import cookieValue from '../../utils/cookieValue';
import AuthControls from '../../components/elements/auth-controls';

const AuthNav = () => {
  const { profile, waiting } = useSelector((s) => s.user);
  const store = useStore();
  const { t } = useTranslate();

  const cb = {
    onLogout: useCallback(() => {
      store.get('user').onLogout(cookieValue('token'));
    }, []),
  };

  if (profile.name) {
    return (
      <AuthControls
        link={{ name: profile.name, to: '/profile' }}
        onLogout={cb.onLogout}
        waiting={waiting}
        t={t}
      />
    );
  }

  return (
      <Link to={'/sign_in'}>
        <button>{t('nav.login')}</button>
      </Link>
  );
};

export default React.memo(AuthNav);
