import React, {useCallback} from "react";
import LoginLayout from "../../components/login-layout";
import {postData} from "../../utils/post-data";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function LoginForm(){
  const store = useStore();

  const select = useSelector(state=>({
    loginError: state.user.loginError,
    login: state.user.login,
    password: state.user.password
  }));

  let login = select.login;
  let password = select.password;

  const handleLogin = ()=>{
    postData('/api/v1/users/sign', {login,password})
    .then((res)=>{
    if (res.error) store.setState({
      ...store.getState(),
      user: {
        loginError: res.error.message,
        login: '',
        password: ''
    }});
    });
  }

  const onLogin = (e)=>{
    store.get('user').setLogin(e.target.value);
  }

  const onPassword = (e)=>{
    store.get('user').setPassword(e.target.value);
  }

//   const callbacks = {
//     onLogin: useCallback((login, password)=>handleLogin(login, password),[])
//   }

  return (
    <LoginLayout onButtonClick={handleLogin} 
      error={select.loginError}
      onPassword={onPassword} onLogin={onLogin}
      login={login} password={password} />
  )
}

export default LoginForm;