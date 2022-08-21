import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function LoginCard({onAuth, user}) {

  // CSS классы по БЭМ
  const cn = bem('LoginCard');

  function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let login = formData.get("login");
    let password = formData.get("password");
    onAuth(login,password)
    };
    function error(){if(user.error){
      if(user.error.message!="Access forbidden"){return user.error.message}}}

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
      <div className={cn('prop')}>
        Логин<br/>
        <input type='text' name="login"></input>
      </div>
      <div className={cn('prop')}>
        Пароль<br/>
        <input type='password' name="password" ></input>
      </div>
      <button type='submit'>Войти</button>
      </form>
      <div className={cn('error')}>
        {error()}
      </div>
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
