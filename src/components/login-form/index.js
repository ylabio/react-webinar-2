import React, { useCallback, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

const LoginForm = ({ onLogin, error, t }) => {
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
      <h2>{t('auth.title')}</h2>
      <form className={cn('form')} onSubmit={callbacks.onSubmit}>
        <label>
          {t('auth.label.login')}
          <input type='text' value={login} onChange={onChange.setLogin} />
        </label>
        <label>
          {t('auth.label.pass')}
          <input
            type='password'
            value={password}
            onChange={onChange.setPassword}
          />
        </label>
        {error && <span className={cn('error')}>{error}</span>}
        <input type='submit' value={t('auth.enter')} />
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: propTypes.func,
  error: propTypes.string,
  t: propTypes.func,
};

LoginForm.defaultProps = {
  t: (text) => text,
};

export default React.memo(LoginForm);
