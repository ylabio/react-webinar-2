import React, { useCallback } from 'react';
import './style.css';

// не работали контролируемые инпуты почему-то
//
const LoginForm = ({ error, onSubmit }) => {
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
        <input className='login-form__field' name="password" />
      </label>

      {error && <p className='login-form__warning'>Некая ошибка от сервера</p>}

      <button>Войти</button>
    </form>
  )
}

export default LoginForm;