import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import AuthControls from "../../components/auth-controls";
import useSelector from "../../hooks/use-selector";

function AuthUser() {
  const store = useStore()
  const select = useSelector(state => ({
    username: state.auth.user?.profile?.name,
    isAuthenticated: state.auth.isAuthenticated
  }));

  const {t} = useTranslate();

  const callbacks = {
    logout: useCallback(_ => store.get('auth').logout(), [])
  };

  return (
    <AuthControls isAuthenticated={select.isAuthenticated} 
                  username={select.username} 
                  logout={callbacks.logout}
                  t={t}
    />
  )
}

export default React.memo(AuthUser);
