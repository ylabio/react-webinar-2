import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import LayoutFlex from "../../components/layouts/layout-flex";
import ControlsLogin from "../../components/admin/controls-login";
import useSelector from "../../hooks/use-selector";
import {Link} from "react-router-dom";
import Spinner from "../../components/spinner";

function PanelLogin() {
  const store = useStore();

  useInit(async () => {
    if (localStorage.getItem('token')) {
      await store.get('login').checkLogin(localStorage.getItem('token'));
    }
  }, []);

  const select = useSelector(state => ({
    token: state.login.token,
    isAuth: state.login.isAuth,
    user: state.login.user,
    waiting: state.login.waiting,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Выход
    logOut: useCallback((token) => store.get('login').logOut(token), []),
  };

  return (
    <LayoutFlex flex="end">
        {
          select.isAuth
            ? <Spinner active={select.waiting}>
                <ControlsLogin logOut={callbacks.logOut} token={select.token} user={select.user.profile} t={t}/>
              </Spinner>
            : <Link to="/login">
                <button>{t('panel.enter')}</button>
              </Link>
        }
    </LayoutFlex>
  )
}

export default React.memo(PanelLogin);
