import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import Input from "../input";

function LoginForm(props) {
  const cn = bem('LoginForm');
  
  const [loginInput, setLoginInput] = React.useState('test_1');
  const [passwordInput, setPasswordInput] = React.useState('123456');
  
  return (
    <div className={cn()}>
      <div className={cn('title')}>{props.t('header.login')}</div>
      <div className={cn('inputWrapper')}>
        <label>{props.t('login.login')}</label><br/>
        <Input value={loginInput} onChange={e => setLoginInput(e)} type='text'/>
      </div>
      <div className={cn('inputWrapper')}>
        <label>{props.t('login.password')}</label><br/>
        <Input value={passwordInput} onChange={e => setPasswordInput(e)} type='password'/>
      </div>
      <div className={cn('error')}>{props.errorMessage}</div>
      <button onClick={() => props.login(loginInput, passwordInput)}>{props.t('login.signIn')}</button>
    </div>
  )
}

LoginForm.propTypes = {}

LoginForm.defaultProps = {}

export default React.memo(LoginForm);
