import React, { useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function LoginForm({ onLogin, error, t }) {
  const cn = bem('LoginForm');
  
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(login, password);
  };

  return (
    <div className={cn()}>
      <h2>{t('login')}</h2>
      <form onSubmit={handleSubmit}>
        <div className={cn('prop')}>
          <label>{t('login')}</label>
          <input value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div className={cn('prop')}>
          <label>{t('password')}</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
        </div>
        {error && <div className={cn('error')}>{error}</div>}
        <button type='submit'>{t('submit')}</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  error: propTypes.string,
  onLogin: propTypes.func.isRequired,
  t: propTypes.func,
};

LoginForm.defaultProps = {
  t: (text) => text,
};

export default React.memo(LoginForm);