import React, { useCallback } from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';

function LoginForm({logIn, error, t}) {
  const cn = bem('LoginForm');

  const userHandler = useCallback((e) => {
      e.preventDefault();
      logIn(e.target[0].value, e.target[1].value);
    },[]
  )
  console.log();
  return (
    <div className={cn()}>
      <form onSubmit={userHandler}>
        <h2 className={cn('title')}>{t('login.panel.login')}</h2>
        <label>
          {t('login.username')}
          <input type="text"/>
        </label>
        <label>
          {t('login.password')}
          <input type="password"/>
        </label>
        {error && <div className={cn('error')}>{error}</div>}
        <button>{t('login.submit')}</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  logIn: propTypes.func,
  error: propTypes.string,
  t: propTypes.func
}

LoginForm.defaultProps = {
  logIn: () => {},
  error: 'error',
  t: (text) => text
}

export default React.memo(LoginForm);
