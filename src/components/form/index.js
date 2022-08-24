import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import FormInput from "../form-input"

function Form(
  { 
    login, 
    password, 
    changLogin, 
    changePassword, 
    onSubmit, 
    error, 
    t 
  }){
    
  const cn = bem('Form');

  return (
    <form onSubmit={onSubmit} className={cn()}>
        <span className={cn('title')}>{t('login.title')}</span>
        <FormInput onChange={changLogin} value={login} label={t('login.login')}/>
        <FormInput onChange={changePassword} value={password} label={t('login.password')} type='password'/>
        { error && <span className={cn('error')}>{error}</span> }
        <button className={cn('btn')} type='submit'>{t('login.come')}</button>
    </form>
  )
}

Form.propTypes = {
  login: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  changLogin: propTypes.func.isRequired,
  changePassword: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  error: propTypes.string,
  t: propTypes.func,
}

Form.defaultProps = {
  error: '',
  t: () => {},
}

export default React.memo(Form);