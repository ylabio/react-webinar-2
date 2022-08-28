import React, {useCallback} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import Input from "../input";
import propTypes from "prop-types";

function LoginForm(props) {
  const cn = bem('LoginForm');
  
  const [data, setData] = React.useState({
    loginInput: '',
    passwordInput: ''
  })
  
  const callbacks = {
    onChange: useCallback((value, name) => {
      setData(prevData => ({...prevData, [name]: value}))
      console.log(data)
    }, [])
  };
  
  
  return (
    <div className={cn()}>
      <div className={cn('title')}>{props.t('header.login')}</div>
      <div className={cn('inputWrapper')}>
        <label>{props.t('login.login')}</label><br/>
        <Input value={data.loginInput} onChange={e => callbacks.onChange(e, 'loginInput')} type='text'/>
      </div>
      <div className={cn('inputWrapper')}>
        <label>{props.t('login.password')}</label><br/>
        <Input value={data.passwordInput} onChange={e => callbacks.onChange(e, 'passwordInput')} type='password'/>
      </div>
      <div className={cn('error')}>{props.errorMessage}</div>
      <button onClick={() => props.login(data.loginInput, data.passwordInput)}>{props.t('login.signIn')}</button>
    </div>
  )
}

LoginForm.propTypes = {
  t: propTypes.func.isRequired,
  login: propTypes.func,
  errorMessage: propTypes.string
}

LoginForm.defaultProps = {
  login: () => {
  }
}

export default React.memo(LoginForm);
