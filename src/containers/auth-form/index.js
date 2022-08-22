import React, { useState, useCallback, useEffect } from "react";
import {useNavigate, useLocation} from "react-router-dom"
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
      navigate(-1, {replace: true})
    }
  }, [select.token, select.user])

  const [fields, setFields] = useState({
    login: '',
    password: ''
  });

  const callbacks = {
    onPutLogin: useCallback(value => {
      setFields({...fields, login: value})
    }, [fields]),
    onPutPassword: useCallback(value => {
      setFields({...fields, password: value})
    }, [fields]),
    onFetch: useCallback(() => {
      if(fields.login && fields.password) {
        store.get('authentication').logIn(fields.login, fields.password);
      }
    }, [fields])
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