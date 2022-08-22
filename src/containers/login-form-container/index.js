import React, { useCallback, useEffect, useState } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../components/login-form";
import { Navigate, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function LoginFormContainer() {

  const store = useStore();
  const [loginForm, setLoginForm] = useState( {login: '', password: ''});
  
  const select = useSelector(state => ({
    auth: state.auth,
  }));

  const callbacks = {
    login: useCallback((login, password) => store.get('auth').login(login, password), []),
  };

  if(select.auth.isLogin === true) {
    return <Navigate replace to={"/"} />
  }

  return (
    <>
      <LoginForm 
                login={loginForm.login}
                password={loginForm.password}
                setLoginForm={setLoginForm}
                loginFetch={callbacks.login}
                error={select.auth.error} />
    </>
  )
}

export default React.memo(LoginFormContainer);
