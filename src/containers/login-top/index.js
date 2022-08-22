import React, {useCallback, useMemo} from "react";
import {useNavigate, Link} from "react-router-dom";
import LayoutFlex from "../../components/layout-flex";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import LoginPanel from "../../components/login-panel";

function LoginTop() {
  const {t} = useTranslate();
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: localStorage.getItem('token'),
    user: state.user,
    userExists: state.user.userExists,
  }));

  useInit(async () => {
    if (select.token && !select.userExists) {
      await store.get('user').load();
    }
  }, [select.token]);

  const callbacks = {
    logIn: useCallback(() => navigate("/login"), [navigate]),
    logOut: useCallback(() => store.get("user").logOut(), []),
  };

  return (
    <LayoutFlex flex="end" padding={false}>
      {select.user.token && <Link to={`/profile`}>{select.user.user.profile.name}</Link>}
      <LoginPanel log={select.user.token ? callbacks.logOut : callbacks.logIn}
                  title={select.user.token ? t('login.panel.logout') : t('login.panel.login')}
        />
    </LayoutFlex>
  )
}

export default React.memo(LoginTop);
