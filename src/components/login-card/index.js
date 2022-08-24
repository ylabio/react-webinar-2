import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function LoginCard(props) {

  // CSS классы по БЭМ
  const cn = bem('LoginCard');

  function handleSubmit(event) {
    event.preventDefault();
    props.onAuth(props.login,props.password)
    };
    function error(props){if(props.error){
      if(props.error.message!="Access forbidden"){return props.error.message}}}

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
      <div className={cn('prop')}>
        Логин<br/>
        <input type='text' name="login" value={props.login} onChange={(e)=>props.setLogin(e.currentTarget.value)}></input>
      </div>
      <div className={cn('prop')}>
        Пароль<br/>
        <input type='password' name="password" value={props.password} onChange={(e)=>props.setPassword(e.currentTarget.value)} ></input>
      </div>
      <div className={cn('error')}>
        {error(props.user)}
      </div>
      <button type='submit'>Войти</button>
      </form>
    </div>
  )
}

LoginCard.propTypes = {
  user: propTypes.object.isRequired,
  onAdd: propTypes.func
}

LoginCard.defaultProps = {
  user: {},
  onAdd: () => {}
}

export default React.memo(LoginCard);
