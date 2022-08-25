import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './styles.css';

function LoginForm({
  auth,
  authError,
  login,
  password,
  emptyErrorLogin,
  emptyErrorPassword,
  clearInputs,
  changeInput,
  changeIsEmptyError,
  t,
  disabledLogin,
}) {
  const cn = bem('LoginForm');

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      auth({ login, password });
      clearInputs();
    },
    changeIsEmptyErrorLogin: () => {
      if (login.trim() === '') {
        changeIsEmptyError('login', true);
      }
    },
    changeIsEmptyErrorPassword: () => {
      if (password.trim() === '') {
        changeIsEmptyError('password', true);
      }
    },
  };

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('auth.login')}</h2>
      <form className={cn('form')} onSubmit={callbacks.onSubmit}>
        <label className={cn('label')}>
          {t('auth.login')}
          <input
            className={cn('input')}
            value={login ?? ''}
            onChange={(e) => changeInput('login', e.currentTarget.value)}
            onBlur={callbacks.changeIsEmptyErrorLogin}
          />
          {emptyErrorLogin && <p className={cn('error-message')}>Поле обязательно к заполнению</p>}
        </label>

        <label className={cn('label')}>
          {t('auth.password')}
          <input
            type="password"
            className={cn('input')}
            value={password ?? ''}
            onChange={(e) => changeInput('password', e.currentTarget.value)}
            onBlur={callbacks.changeIsEmptyErrorPassword}
          />
          {emptyErrorPassword && (
            <p className={cn('error-message')}>Поле обязательно к заполнению</p>
          )}
        </label>

        {authError && <p className={cn('error-message')}>{authError}</p>}

        <input type="submit" value={t('auth.login')} disabled={disabledLogin} />
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  auth: propTypes.func,
  authError: propTypes.string,
  t: propTypes.func,
  disabledLogin: propTypes.bool,
  login: propTypes.string,
  password: propTypes.string,
  emptyErrorLogin: propTypes.bool,
  emptyErrorPassword: propTypes.bool,
  clearInputs: propTypes.func,
  changeInput: propTypes.func.isRequired,
  changeIsEmptyError: propTypes.func,
};

LoginForm.defaultProps = {
  auth: () => {},
  t: (text) => text,
  disabledLogin: false,
  login: '',
  password: '',
  emptyErrorLogin: false,
  emptyErrorPassword: false,
  clearInputs: () => {},
  changeIsEmptyError: () => {},
};

export default React.memo(LoginForm);
