import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import Input from '../../components/input';
import './style.css';

function LoginPage({t, login, password, onChangeLogin, onChangePassword, onSubmit, error}) {
  const cn = bem('LoginPage');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className={cn()}>
      <h2>{t('enter')}</h2>
      <form className={cn('form')} onSubmit={(e) => handleSubmit(e)}>
        <div className={cn('credentials')}>
          <div className={cn('input')}>
            <label>Логин</label>
            <Input onChange={onChangeLogin} value={login} theme='auth'/>
          </div>
          <div className={cn('input')}>
            <label>Пароль</label>
            <Input onChange={onChangePassword} value={password} type='password' theme='auth'/>
          </div>
        </div>
        <span className={cn('err-msg')}>{error}</span>
        <div>
          <button
            className={cn('button')}
            onClick={() => navigate(-1)}
            type='submit'
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  )
}

LoginPage.propTypes = {
  t: propTypes.func.isRequired,
  login: propTypes.string,
  password: propTypes.string,
  onChangeLogin: propTypes.func.isRequired,
  onChangePassword: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  error: propTypes.string
}

LoginPage.defaultProps = {
  login: 'введите логин',
  password: '******',
  error: ''
}

export default React.memo(LoginPage);
