import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import LayoutFlex from "../../components/layout-flex";
import useStore from "../../hooks/use-store";
import LoginControls from "../../components/login-controls";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";

function LoginTools(){

  const navigate = useNavigate();
  const store = useStore();
  const {t} = useTranslate();

  const callbacks = {
    onLogin: useCallback(() => navigate('/login'), [navigate]),
    onLogout: useCallback(() => store.get('login').logout(), []),
  }

  const select = useSelector(state => ({
    user: state.login.user,
    loadingError: state.login.loadingError
  }))

  useInit(() => {
    if (!select.user && localStorage.getItem('TOKEN') && !select.loadingError) {
      store.get('login').getProfile();
    }
  }, [])

  return (
    <LayoutFlex flex="end" padding={false}>
      <LoginControls onLogin={callbacks.onLogin}
                     t={t}
                     userName={select.user?.profile.name}
                     onLogout={callbacks.onLogout}
                     link={'/profile'}/>
    </LayoutFlex>
  )
}

export default React.memo(LoginTools);