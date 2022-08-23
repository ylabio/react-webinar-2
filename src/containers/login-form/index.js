import React from "react";
import LoginLayout from "../../components/login-layout";
import {postData} from "../../utils/post-data";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";

function LoginForm(){
  const store = useStore();
  const navigate = useNavigate();

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
          loginError: res.error.data.issues[0].message,
          login: '',
          password: ''
      }});
      else {store.setState({
        ...store.getState(),
        user: {
          loginError: '',
          login: '',
          password: '',
          ...res.result.user,
          token: res.result.token
        }
      });
      localStorage.setItem('token', res.result.token);
      navigate('/cabinet', { replace: true });
      }
    });
  }

  const onLogin = (e)=>{
    store.get('user').setLogin(e.target.value);
  }

  const onPassword = (e)=>{
    store.get('user').setPassword(e.target.value);
  }

  return (
    <LoginLayout onButtonClick={handleLogin} 
      error={select.loginError}
      onPassword={onPassword} onLogin={onLogin}
      login={login} password={password} />
  )
}

export default LoginForm;