import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import TextField from "text-field";
import './style.css';

function LoginForm({errorMessage, onLogin}) {

  // CSS классы по БЭМ
  const cn = bem('LoginForm');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(login, password);
  }

  return (
    <form onSubmit={handleSubmit} className={cn()}>
      <h2 className={cn('title')}>Вход</h2>

      <TextField label="Логин" value={login} onChange={setLogin}/>
      <TextField type={'password'} label="Пароль" value={password}
                 onChange={setPassword}/>

      {errorMessage ? <p className={cn('error')}>{errorMessage}</p> : null}
      <button>Войти</button>
    </form>
  )
}

LoginForm.propTypes = {
  onLogin: propTypes.func,
  errorMessage: propTypes.string,
}

LoginForm.defaultProps = {}

export default React.memo(LoginForm);
