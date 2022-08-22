import React, {useState} from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './styles.css';

function LoginForm(props) {
  const cn = bem('LoginForm');

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(formData);
  };

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form onSubmit={onSubmit}>
        <label>Логин</label>
        <input id="login" value={formData.login} onChange={onChange} autoComplete="username"/>
        <label>Пароль</label>
        <input id="password" value={formData.password} type='password' onChange={onChange} autoComplete="current-password"/>
        <div className={props.error ? cn('error-active') : cn('error-none')}><pre>{props.error}</pre></div>
        <button>Войти</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
  error: propTypes.string
}

LoginForm.defaultProps = {
  error: ""
}

export default React.memo(LoginForm);