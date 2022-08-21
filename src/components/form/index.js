import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import FormInput from "../form-input"

function Form({ login, password, changLogin, changePassword, onSubmit, error }){
  const cn = bem('Form');

  return (
    <form onSubmit={onSubmit} className={cn()}>
        <FormInput onChange={changLogin} value={login} label='Логин'/>
        <FormInput onChange={changePassword} value={password} label='Пароль'/>
        { error && <span className={cn('error')}>{error}</span> }
        <button className={cn('btn')} type='submit'>Войти</button>
    </form>
  )
}

Form.propTypes = {
}

Form.defaultProps = {
}

export default React.memo(Form);