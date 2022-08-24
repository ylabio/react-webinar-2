import React, {useCallback, useMemo} from "react";
import {useNavigate} from "react-router-dom";
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
    userName: state.user.user.profile?.name,
    userExists: state.user.userExists,
  }));

  const callbacks = {
    logIn: useCallback(() => navigate("/login"), [navigate]),
    logOut: useCallback(() => store.get("user").logOut(), []),
  };

  return (
    <LayoutFlex flex="end" padding={false}>
      <LoginPanel log={select.userExists ? callbacks.logOut : callbacks.logIn}
                  title={select.userExists ? t('login.panel.logout') : t('login.panel.login')}
                  userExists={select.userExists}
                  toProfile={`/profile`}
                  userName={select.userName}
        />
    </LayoutFlex>
  )
}

export default React.memo(LoginTop);
