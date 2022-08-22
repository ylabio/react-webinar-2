import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import './style.css';

// не работали контролируемые инпуты почему-то
//
const LoginForm = ({ onSubmit, error, errorText }) => {
  const callbacks = {
    onSubmit: useCallback(event => {
      event.preventDefault();
      onSubmit(
        event.currentTarget.login.value,
        event.currentTarget.password.value
      );
    }, []),
  };

  return (
    <form className='login-form' onSubmit={callbacks.onSubmit}>      
      <h2>Вход</h2>

      <label>Имя пользователя
        <input className='login-form__field' name="login" />
      </label>

      <label>Пароль
        <input className='login-form__field' type="password" name="password" />
      </label>

      {error && <p className='login-form__warning'>{'Ошибка ' + errorText}</p>}

      <button>Войти</button>
    </form>
  )
}

LoginForm.propTypes = {
  error: propTypes.bool,
  errorText: propTypes.string,
  onSubmit: propTypes.func,
};

LoginForm.defaultProps = {
  errorText: '',
  onSubmit: () => {},
};

export default LoginForm;