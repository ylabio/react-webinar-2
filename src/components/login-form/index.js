import React, { useCallback, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

const LoginForm = ({ onLogin, error }) => {
  const cn = bem('LoginForm');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const callbacks = {
    onSubmit: useCallback(
      (event) => {
        event.preventDefault();
        onLogin(login, password);
      },
      [onLogin, login, password]
    ),
  };

  const onChange = {
    setLogin: useCallback((e) => setLogin(e.target.value), [setLogin]),
    setPassword: useCallback((e) => setPassword(e.target.value), [setPassword]),
  };

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form className={cn('form')} onSubmit={callbacks.onSubmit}>
        <label>
          Логин
          <input type='text' value={login} onChange={onChange.setLogin} />
        </label>
        <label>
          Пароль
          <input
            type='password'
            value={password}
            onChange={onChange.setPassword}
          />
        </label>
        {error && <span className={cn('error')}>{error}</span>}
        <input type='submit' value='Войти' />
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: propTypes.func,
  error: propTypes.string,
};

LoginForm.defaultProps = {};

export default React.memo(LoginForm);
