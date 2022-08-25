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
    isWaiting: state.auth.waiting,
    err: state.auth.err,
  }));
const isAuthErr = typeof select.err === 'string' || select.err === null;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  const callbacks = {
    logIn: useCallback((password, name) => store.get('auth').logIn(password, name), []),
  }

  return (
    <Spinner active={select.isWaiting}>   
      <form className={(cn())} onSubmit={(e) => {
        e.preventDefault();
        callbacks.logIn(password, name);
        (!!isAuthErr && history.length === 2) && navigate('/?category=&page=1&limit=10&sort=order&query=', {replace: true });
        (!!isAuthErr && history.length > 2) && navigate(-1);
        }}>
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
        {isAuthErr && <div className={(cn('err'))}>{select.err}</div>}
        <input className={(cn('inputButton'))} type="submit" value={login} />
      </form>
    </Spinner> 
    )
  }

export default React.memo(LoginForm);

