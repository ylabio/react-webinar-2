import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import LoginHead from "../../components/login-head";
import Spinner from "../../components/spinner";

function loginHeadContainer() {
  
  const store = useStore();
  const select = useSelector(state => ({
    user: state.user,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Забыть
    onSignOut: useCallback(() => store.get('user').signOut(), [])
  };
  return (
    <Spinner active={select.user.waiting}>
    <LoginHead 
        signOut={callbacks.onSignOut} 
        user={select.user} 
        Loginlink='/login' 
        ProfileLink='/profile'
        signin={t('signin')}
        signout={t('signout')}
    />
    </Spinner>
  );
}
export default React.memo(loginHeadContainer);
