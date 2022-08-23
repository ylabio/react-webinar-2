import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginCard({ onLogin, error, t }) {
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
      <h2>{t('login.title')}</h2>
      <form onSubmit={callbacks.onSubmit}>
        <label>{t('login.login')}<input type="text" value={login} onChange={onChange.setLogin} /></label>
        <label>
          {t('login.password')}
          <input
            type="password"
            autoComplete="on"
            value={password}
            onChange={onChange.setPassword} />
        </label>
        {error && <span>{error}</span>}
        <input type="submit" value={t('login.submit')} />
      </form>
    </div>
  );
}

LoginCard.propTypes = {
  onLogin: propTypes.func,
  error: propTypes.string,
  t: propTypes.func
};

LoginCard.defaultProps = {
  onLogin: () => {},
  error: '',
  t: (text) => text
};

export default React.memo(LoginCard);
