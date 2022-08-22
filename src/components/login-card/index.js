import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginCard({ onLogin, error }) {
  const cn = bem('LoginCard');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const callbacks = {
    onSubmit: useCallback((event) => {
      event.preventDefault();
      onLogin(login, password);
    }, [onLogin, login, password])
  };

  // Обработчики изменений в поле
  const onChange = {
    setLogin: useCallback(e => setLogin(e.target.value), [setLogin]),
    setPassword: useCallback(e => setPassword(e.target.value), [setPassword])
  };

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form onSubmit={callbacks.onSubmit}>
        <label>Логин<input type="text" value={login} onChange={onChange.setLogin} /></label>
        <label>
          Пароль
          <input
            type="password"
            autoComplete="on"
            value={password}
            onChange={onChange.setPassword} />
        </label>
        {error && <span>{error}</span>}
        <input type="submit" value="Войти" />
      </form>
    </div>
  );
}

LoginCard.propTypes = {
  onLogin: propTypes.func,
  error: propTypes.string
};

LoginCard.defaultProps = {
  onLogin: () => {},
  error: ''
};

export default React.memo(LoginCard);
