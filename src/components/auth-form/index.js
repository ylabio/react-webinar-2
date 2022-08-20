import React, {useState} from 'react'
import propTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import './style.css'

function AuthForm(props) {
  const cn = bem('AuthForm')
  const navigate = useNavigate()

  const [loginForm, setLoginForm] = useState({login: '', password: ''});
  const [error, setError] = useState('')

  const onChangeHandler = (e) => {
    setLoginForm({...loginForm, [e.target.name]: e.target.value})
    setError('')
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (loginForm.login === '' || loginForm.password === '') {
      return setError('Заполните все поля')
    } 
    props.login(loginForm)
    // После успешной авторизации делаем редирект на профиль пользователя
      .then(_ => navigate('/profile'))
    // Если что-то пошло не так, выводим ошибку
      .catch(_ => setError('Некая ошибка от сервера'))
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{props.t('auth.signin')}</h2>
      <form onSubmit={onSubmitHandler} className={cn('form')}>
        <label className={cn('label')}>
          {props.t('auth.username')}
          <input className={cn('input')} 
                 type="text" 
                 name="login" 
                 value={loginForm.login} 
                 onChange={onChangeHandler}/>
        </label>
        <label className={cn('label')}>
          {props.t('auth.password')}
          <input className={cn('input')}  
                 type="password" 
                 name="password" 
                 value={loginForm.password} 
                 onChange={onChangeHandler}/>
        </label>
        {error && <div className={cn('error')}>{error}</div>}
        <button type="submit" className={cn('btn')}>{props.t('auth.login')}</button>
      </form>
    </div>
  )
}

export default AuthForm

AuthForm.propTypes = {
  login: propTypes.func,
  t: propTypes.func
}

AuthForm.defaultProps = {
}