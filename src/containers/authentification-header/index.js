import React, { useCallback, useMemo } from 'react';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Authentification from '../../components/authentification';
import { useLocation, useNavigate } from 'react-router-dom';

function AuthentificationHeader() {
  const store = useStore();

  const select = useSelector((state) => ({
    user: state.user,
  }));

  const location = useLocation();

  const { t } = useTranslate();

  const navigate = useNavigate();

  const callbacks = {
    onLogIn: useCallback(
      ({ login, password }) => store.get('user').logInUser({ login, password }),
      []
    ),

    onLogOut: useCallback(() => store.get('user').logOutUser(), []),
    translate: useCallback((text) => t(text)),
    navigate: useCallback((link) => navigate(link)),
  };

  return (
    <Authentification
      user={select.user}
      onLogOut={callbacks.onLogOut}
      translate={callbacks.translate}
      navigate={callbacks.navigate}
      locationState={{ from: location.pathname }}
    />
  );
}

export default React.memo(AuthentificationHeader);
