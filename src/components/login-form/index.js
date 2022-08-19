import React, { useEffect, useState } from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LoginForm({ login, navigate, errorMsg, clearErrorMsg, user }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const cn = bem('LoginForm');

  const callbacks = {
    login: () => {
      const usernameLength = username.trim().length;
      const passwordLength = password.trim().length;
      if (usernameLength && passwordLength) {
        login(username, password);
      }
    },
  };

  useEffect(() => {
    let id;

    if (errorMsg) {
      setShowAlert(true);
      id = setTimeout(() => {
        setShowAlert(false);
        clearErrorMsg();
      }, 2000);
    }

    if (user) {
      navigate();
    }

    return () => clearTimeout(id);
  }, [errorMsg, user])

  return (
    <form 
      onSubmit={(e) => e.preventDefault()}
      className={cn()}
    >
      <h2>Вход</h2>

      <label className={cn('label')}>
        Логин
        <input
          className={cn('input')} 
          type='text'  
          placeholder='test_1' 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label className={cn('label')}>
        Пароль
        <input
          className={cn('input')} 
          type='password' 
          placeholder='123456' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required  
        />    
      </label>

      {showAlert && (
        <div className={cn('alert')}>
          {errorMsg}
        </div>
      )}

      <button 
        type="submit"
        className={cn('submit')}
        onClick={callbacks.login}
      >Войти</button>
    </form>
  );
}

LoginForm.propTypes = {
  login: propTypes.func.isRequired,
  navigate: propTypes.func.isRequired,
  clearErrorMsg: propTypes.func.isRequired,
  errorMsg: propTypes.string.isRequired,
  user: propTypes.object,
};

LoginForm.defaultProps = {
  user: null,
};

export default React.memo(LoginForm);

