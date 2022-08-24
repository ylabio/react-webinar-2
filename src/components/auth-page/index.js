import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname'
import './style.css';

function AuthPage({ onSubmit, handleLoginChange, handlePasswordChange, logErr }) {

  const cn = bem('AuthPage');

  return (
    <div className={cn()}>
      <form onSubmit={onSubmit} className={cn('form')}>
        <span className={cn('title')}>Вход</span>
        <div className={cn('input')}>
          <span>Логин</span>
          <div>
            <input name="email" type="text" onChange={handleLoginChange} />
          </div>
        </div>
        <div className={cn('input')}>
          <span>Пароль</span>
          <div>
            <input name="password" type="password" onChange={handlePasswordChange} />
          </div>
        </div>
        {logErr.active && <span className={cn('error')}>{logErr.err?.message || "Некая ошибка от сервера"}</span>}
        <div>
          <button type="submit" className={cn('submit')}>Войти</button>
        </div>
      </form>
    </div>
  )
}

AuthPage.propTypes = {
  onSubmit: propTypes.func,
  handleLoginChange: propTypes.func,
  handlePasswordChange: propTypes.func,
  logErr: propTypes.object
}

AuthPage.defaultProps = {
  onSubmit: (e) => e.preventDefault(),
  handleLoginChange: () => {},
  handlePasswordChange: () => {},
  logErr: {active: false, err: { }}
}

export default React.memo(AuthPage);
