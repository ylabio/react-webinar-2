import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Login(props) {
  const cn = bem('Login');
  const navigate = useNavigate();

  const [login, setlogin] = useState({ login: '', password: '' });
  const [error, setError] = useState('');

  const onChangeHandler = e => {
    setlogin({ ...login, [e.target.name]: e.target.value });
    setError('');
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    if (login.login === '' || login.password === '') {
      return setError('Заполните все поля');
    }
    props
      .login(login)
      .then(() => navigate('/profile'))
      .catch(() => setError('Некая ошибка от сервера'));
  };

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{props.t('Вход')}</h2>
      <form onSubmit={onSubmitHandler} className={cn('form')}>
        <label className={cn('label')}>
          Логин
          <input
            className={cn('input')}
            type='text'
            name='login'
            value={login.login}
            onChange={onChangeHandler}
          />
        </label>
        <label className={cn('label')}>
          Пароль
          <input
            className={cn('input')}
            type='password'
            name='password'
            value={login.password}
            onChange={onChangeHandler}
          />
        </label>
        {error && <div className={cn('error')}>{error}</div>}
        <button type='submit' className={cn('btn')}>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;

Login.propTypes = {
  login: propTypes.func,
  t: propTypes.func,
};

Login.defaultProps = {};
