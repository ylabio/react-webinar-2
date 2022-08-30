import React, {useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import LayoutFlex from "../../components/layout-flex";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";


function TopContainer() {

  const {t} = useTranslate();

  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists
  }))

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),

    // Отмена авторизации
    onSignOut: useCallback(() => {
      store.get('session').signOut();
    }, [location.pathname]),
  };

  return (
    <LayoutFlex flex="end" indent="small">
      {select.exists && <Link to="/profile">{select.user.profile.name}</Link>}
      {select.exists
        ? <button onClick={callbacks.onSignOut}>{t('session.signOut')}</button>
        : <button onClick={callbacks.onSignIn}>{t('session.signIn')}</button>
      }
    </LayoutFlex>
  );
}

export default React.memo(TopContainer);
