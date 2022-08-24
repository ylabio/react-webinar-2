import React, {useState, useCallback} from "react"
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import {cn as bem} from '@bem-react/classname';
import "./styles.css"

const LoginForm = () => {
  let [login, setLogin] = useState("");
  let [password, setPassword] = useState("");
  let cn = bem("LoginForm");
  let store = useStore();

  const callbacks = {
    onLogIn: useCallback((login, password) => {
      store.get("user").logIn(login, password).then((res) => {
        if(res !== undefined) store.get('profile').setProfile(res.result.user.profile)
      });
    }, [])
  }

  let error = useSelector((state) => state.user.error);

  const submitForm = (e) => {
    e.preventDefault();
    callbacks.onLogIn(login, password);
  }

  return (
  <div className={cn()}>
    <div className={cn("header")}>Вход</div>
    <form onSubmit={submitForm}>
    <label htmlFor="login" className={cn("label")}>
      Логин
      <input id="login" value={login} onChange={(e) => setLogin(e.currentTarget.value)} placeholder="Введите логин" />
    </label>
    <label htmlFor="password" className={cn("label")}>
      Пароль
      <input id="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} placeholder="Введите пароль" />
    </label>
    {error ?
    <div className={cn("error")}>{error}</div>
    :
    <></>
    }
    <button type="submit" className={cn("submit")}>Войти</button>
  </form>
  </div>
  )
}

export default React.memo(LoginForm);