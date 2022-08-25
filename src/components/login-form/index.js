import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import './style.css';
import Spinner from "../spinner";

const LoginForm = (props) => {
  const { enter, inputname, inputpassword, login } = props.options;
  const navigate = useNavigate();
  const cn = bem('LoginForm');
  const store = useStore();

  const select = useSelector(state => ({
    user: state.auth.user || localStorage.user,
    isWaiting: state.auth.waiting,
    err: state.auth.err,
  }));
  const isAuthErr = select.err !== null;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmited, setSubmited] = useState(null);
  
  const callbacks = {
    logIn: useCallback((password, name) => store.get('auth').logIn(password, name), []),
    onSubmit: useCallback((e) => {
      e.preventDefault();
      callbacks.logIn(password, name);
      setSubmited(true);
      if (!isAuthErr && history.length === 2) return navigate('/?category=&page=1&limit=10&sort=order&query=', {replace: true });
      if (!isAuthErr && history.length > 2) return navigate(-1, {replace: true });
    })
  }

  return select.user ? 
    <div className={(cn())}>
    Вы авторизованы!
    </div> : (
    <Spinner active={select.isWaiting}>   
      <form className={(cn())} onSubmit={callbacks.onSubmit}>
        <h3 className={(cn('header'))}>{enter}</h3>
        <label className={(cn('label'))}>
          {inputname}
          <input className={(cn('input'))}
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className={(cn('label'))}>
          {inputpassword}
          <input className={(cn('input'))}
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {(isAuthErr && isSubmited) && <div className={(cn('err'))}>{select.err}</div>}
        <input className={(cn('inputButton'))} type="submit" value={login} />
      </form>
    </Spinner> 
    )
  }

export default React.memo(LoginForm);

