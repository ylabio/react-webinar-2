import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Login(props) {
  const cn = bem('Login');

  const [login, changeLogin] = useState('');
  const [password, changePassword] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    const form = e.target.elements;
    const login = form['login'].value;
    const password = form['password'].value;
    props.authAttempt(login, password);
  }
  
  return (
    <>
      <form className={cn()} onSubmit={formSubmit}>
        <div className={cn('entry')}><h2>{props.t('auth.entry')}</h2></div>
        <div className={cn('login')}>
          <div>{props.t('auth.login')}</div>
          <input value={login} id='login' onChange={(e)=>changeLogin(e.target.value)} required/>
        </div>
        <div className={cn('password')}>
          <div>{props.t('auth.password')}</div>
          <input type='password' value={password} id='password' onChange={(e)=>changePassword(e.target.value)} required/>
        </div>
        {props.error&&
        <div className={cn('error')}>
          {props.error}
        </div>}
        <div>
          <button type='submit'>
            {props.t('auth.toComeIn')}
          </button>
        </div>
      </form>
    </> 
  )
}

Login.propTypes = {
  t: propTypes.func,
  authAttempt: propTypes.func.isRequired
}

Login.defaultProps = {
  t: (text) => text
}

export default React.memo(Login);
