import React from 'react';
import './style.css';

function Loggin(props) {
  return (
    <div className='loggin'>
      <p className='logginTitle'>Вход</p>
      <div className='inputBlock'>
        <p className='inputLabel'>Логин</p>
        <input onChange={props.loginFunc} className='input'></input>
      </div>
      <div className='inputBlock'>
        <p className='inputLabel'>Пароль</p>
        <input required onChange={props.passwordFunc} className='input'></input>
      </div>
      {props.error ? <p className='error'>{props.errorMessage}</p> : ''}
      <button onClick={props.logging} className='logginButton'>
        Войти
      </button>
    </div>
  );
}

export default Loggin;
