import React, {useState} from 'react';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import propTypes from "prop-types";

function LoginForm(props) {
  const cn = bem('LoginForm');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
  <div className={cn()}>
    <h2 className={cn('title')}>{props.data.title}</h2>
    <form onSubmit={(evt) => {
      evt.preventDefault();
      props.onSubmit(login, password)
    }}>
      <label className={cn('label')} htmlFor='login'>{props.data.login}</label>
      <input value={login}
             className={cn('input')}
             required={true}
             id='login'
             onChange={(evt) => setLogin(evt.target.value)} />
      <label className={cn('label')} htmlFor='password'>{props.data.password}</label>
      <input value={password}
             className={cn('input')}
             required={true}
             id='password'
             onChange={(evt) => setPassword(evt.target.value)}
             type='password' />
      {props.error ? <div className={cn('error')}>{props.error}</div> : null}
      <button type="submit" className={cn('button')}>{props.data.send}</button>
    </form>
  </div>
  )
}

LoginForm.propTypes = {
  data: propTypes.object.isRequired,
  onSubmit: propTypes.func,
  error: propTypes.string,
}

LoginForm.defaultProps = {
  onSubmit: () => {},
  error: '',
}

export default React.memo(LoginForm);
