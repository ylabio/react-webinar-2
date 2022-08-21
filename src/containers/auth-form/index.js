import React, { useState, useCallback, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import LayoutFlex from "../../components/layout-flex";
import FormLogin from "../../components/form-login";
import useStore from '../../hooks/use-store';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

function AuthForm() {
  const store = useStore();
  const {t} = useTranslate();

  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.authentication.user,
    token: state.authentication.token,
    errorMessage: state.authentication.errorMessage,
    waiting: state.authentication.waiting
  }));
  
  useEffect(() => {
    if(select.token && select.user) {
      navigate("/", {replace: true})
    }
  }, [select.token, select.user])

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const callbacks = {
    onPutLogin: useCallback(l => setLogin(l), []),
    onPutPassword: useCallback(p => setPassword(p), []),
    onFetch: useCallback(() => {
      if(login && password) {
        store.get('authentication').logIn(login, password);
        // navigate("/", {replace: true})
      }
    }, [login, password])
  }

  return(
    <LayoutFlex>
      <FormLogin
        onPutLogin={callbacks.onPutLogin}
        onPutPassword={callbacks.onPutPassword}
        onFetch={callbacks.onFetch}
        errorMessage={select.errorMessage}
        t={t}
      />
    </LayoutFlex>
  )
}

export default React.memo(AuthForm)