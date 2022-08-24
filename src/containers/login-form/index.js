import React, {useEffect, useCallback} from "react";
import LoginLayout from "../../components/login-layout";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";

function LoginForm(){
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state=>({
    loginError: state.user.loginError,
    login: state.user.login,
    password: state.user.password,
    token: state.user.token
  }));

  const callbacks = {
    onLogin: useCallback(()=>store.get('user').getLogIn(),[]),
    onChangeLogin: useCallback((e)=>store.get('user').setLogin(e.target.value),[]),
    onChangePassword: useCallback((e)=>store.get('user').setPassword(e.target.value),[])
  }

  useEffect(()=>{
    if (select.token) navigate('/');
  });

  return (
    <LoginLayout onButtonClick={callbacks.onLogin} 
      error={select.loginError}
      onPassword={callbacks.onChangePassword} onLogin={callbacks.onChangeLogin}
      login={select.login} password={select.password} />
  )
}

export default React.memo(LoginForm);
