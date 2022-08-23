import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';
import Input from "../input";

function Forms(props) {
  const cn = bem('Forms');

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form onSubmit={props.onSubmit}>
        <div className={cn('field-email')}>
          <div>Логин</div>
          <div onClick={props.resetError}>
            <Input value={props.email}
                   onChange={props.setEmail}
                   type={'text'}
                   placeholder={'email'}
                   required/>
          </div>
        </div>
        <div className={cn('field-password')}>
          <div>Пароль</div>
          <div onClick={props.resetError}>
            <Input value={props.password}
                   onChange={props.setPassword}
                   type={'password'}
                   placeholder={'password'}
                   required/>
          </div>
          <div className={cn('error')}>{props.error}</div>
        </div>
        <button type={'submit'}>Войти</button>
      </form>
    </div>
  )
}

Forms.propTypes = {
  email: propTypes.string,
  password: propTypes.string,
  setEmail: propTypes.func.isRequired,
  setPassword: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  error: propTypes.string,
  resetError: propTypes.func.isRequired,
}

export default React.memo(Forms);
