import React, { useState } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';

function LoginForm(props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const sendData = (e, login, password) => {
    e.preventDefault();
    props.login(login, password);
    console.log();
  };

  const cn = bem('Form');
  return (
    <>
      <h2 className={cn('title')}>Вход</h2>
      <form action='' className={cn()}>
        <label className={cn('label')}>
          Логин
          <input
            className={cn('input')}
            type='text'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>
        <label className={cn('label')}>
          Пароль
          <input
            className={cn('input')}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {props.error ? <div className={cn('red')}>{props.error}</div> : null}
        <button onClick={(e) => sendData(e, login, password)}>Войти</button>
      </form>
    </>
  );
}

LoginForm.propTypes = {
  login: propTypes.func,
  error: propTypes.string.isRequired,
};

LoginForm.defaultProps = {
  login: () => {},
};

export default React.memo(LoginForm);
