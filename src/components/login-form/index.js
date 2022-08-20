import React, { useEffect, useState } from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LoginForm({ 
  errorMsg,
  username, 
  setUsername, 
  password, 
  setPassword,
  login,
  showAlert, 
}) {
  const cn = bem('LoginForm');

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
        onClick={login}
      >Войти</button>
    </form>
  );
}

LoginForm.propTypes = {
  errorMsg: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  setUsername: propTypes.func.isRequired,
  setPassword: propTypes.func.isRequired,
  login: propTypes.func.isRequired,
  showAlert: propTypes.bool.isRequired,
};

LoginForm.defaultProps = {

};

export default React.memo(LoginForm);

