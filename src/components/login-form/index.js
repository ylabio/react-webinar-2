import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

export const LoginForm = ({ onAuth, isAuth }) => {

  const navigate = useNavigate()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onChange = (data) => {
    if (data.target.name === 'login') {
      setLogin(data.target.value)
    } else if (data.target.name === 'password') setPassword(data.target.value)
  }

  const onClick = () => {
    if (login === '' || password === '') {
      return setError('Заполните все поля')
    }
    onAuth(login, password)
      .then(_ => navigate('/'))
      .catch(error => error.response.data.error.data.issues.map((e) => setError(e.message)))
  }

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '60px 0px 0px 20px' }} action="submit">
      <h2 style={{ margin: 0 }}>Вход</h2>
      <div>
        <div><label htmlFor="">Логин</label></div>
        <div><input value={login} name='login' onChange={onChange} type="text" /></div>
      </div>
      <div>
        <div><label htmlFor="">Пароль</label></div>
        <div><input  value={password} name='password' onChange={onChange} type="password" /></div>
      </div>
      <div style={{color:'red'}}>{error !== '' ? error : ''}</div>
      <div>
        <button type='button' onClick={onClick}>Войти</button>
      </div>
    </form>
  )
}
