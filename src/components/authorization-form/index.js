import React, {useRef} from 'react';
import './styles.css';
import {cn as bem} from "@bem-react/classname";

function AuthorizationForm({onSubmit}) {
  const error = true //временно
  const cn = bem('Authorization-form');
    const loginRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit({
            login: loginRef.current.value,
            password: passwordRef.current.value,
        })
        // async function postData (url, data) {
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     })
        //     return await response.json();
        // }
        // postData('/api/v1/users/sign', { login: loginRef.current.value,
        //     password: passwordRef.current.value, })
        //     .then((data) => {
        //         console.log(data.result.token);
        //         return data.result.token;
        //     });
        // console.log(postData)
    }

  return (
      <div className={cn()}>
          <form action="users/sign" onSubmit={handleSubmit} method={`POST`} className={cn('form')}>
              <p className={cn('title')}>Вход</p>
              <div>
                  <div className={cn('field')}>
                      <input ref={loginRef} className={cn('input')} name="login" id="login"/>
                      <label className={cn('label')} htmlFor="login">Логин</label>
                  </div>
                  <div className={cn('field')}>
                      <input ref={passwordRef} className={cn('input')} type="password" name="password" id="user-password"/>
                      <label className={cn('label')} htmlFor="user-password">Пароль</label>
                  </div>
              </div>
              <div>
                  <p className={cn('error')}>{error ? 'Некая ошибка от сервера' : ''} </p>
                  <button type="submit">Войти</button>
              </div>
          </form>
      </div>
  )
}

export default React.memo(AuthorizationForm);