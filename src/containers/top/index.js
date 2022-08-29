import React, {useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import {useLocation, useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import AuthTrueControls from "../../components/auth-controls/auth-true-controls";
import AuthFalseControls from "../../components/auth-controls/auth-false-controls";


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
    select.exists
      ? <AuthTrueControls onSignOut={callbacks.onSignOut} t={t} userName={select.user.profile.name} link={"/profile"}/>
      : <AuthFalseControls onSignIn={callbacks.onSignIn} t={t}/>
  );
}

export default React.memo(TopContainer);
