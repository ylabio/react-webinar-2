import React, {useCallback, useEffect, useState} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Entry from "../../components/entry";
import Out from "../../components/out";

function AuthContainer() {

  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user
  }));
  
  const callbacks = {
    logout: useCallback((token) => store.get('auth').logout(token), [])
  };

  const {t} = useTranslate();

  const linkEntry = '/login';
  const linkOut = '/profile';

  const [token, deleteToken] = useState('');

  useEffect(() => {
    if (token === 'deleteToken') {
      callbacks.logout(select.user.token);
    }
  }, [token])

  return (
    <div>
      {select.isAuth&&select.user != undefined ?
        <Out userName={select.user.profile.name} id={select.user._id} deleteToken={deleteToken} t={t} link={linkOut}/>
      :
        <Entry t={t} link={linkEntry}/>
      } 
    </div>
  );
}

export default React.memo(AuthContainer);
