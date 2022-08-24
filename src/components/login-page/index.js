import React, {useEffect} from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import Input from '../../components/input';
import './style.css';

function LoginPage({t, login, password, onLogin, onPassword, onNavigate, onSubmit, authorized, error}) {
  const cn = bem('LoginPage');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(login, password);
  }

  if (!authorized) {
    return (
      <div className={cn()}>
        <h2>{t('enter')}</h2>
        <form className={cn('form')} onSubmit={(e) => handleSubmit(e)}>
          <div className={cn('credentials')}>
            <div className={cn('input')}>
              <label>Логин</label>
              <Input onChange={onLogin} value={login} theme='auth'/>
            </div>
            <div className={cn('input')}>
              <label>Пароль</label>
              <Input onChange={onPassword} value={password} type='password' theme='auth'/>
            </div>
          </div>
          <span className={cn('err-msg')}>{error}</span>
          <div>
            <button className={cn('button')} type='submit'>Войти</button>
          </div>
        </form>
      </div>
    )
  } else {
    useEffect(() => {
      onNavigate(-1)
    })
  }
}

LoginPage.propTypes = {
  t: propTypes.func.isRequired,
  login: propTypes.string,
  password: propTypes.string,
  onLogin: propTypes.func.isRequired,
  onPassword: propTypes.func.isRequired,
  onNavigate: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  authorized: propTypes.bool,
  error: propTypes.string
}

LoginPage.defaultProps = {
  login: 'введите логин',
  password: '******',
  authorized: false,
  error: ''
}

export default React.memo(LoginPage);
