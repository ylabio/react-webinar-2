import React, { useState, useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import './style.css';
import Spinner from "../spinner";

const LoginForm = (props) => {
  const { enter, inputname, inputpassword, login } = props.options;
  const { onSubmit, loginState: {user, isWaiting, err} } = props;
  const cn = bem('LoginForm');

  const isAuthErr = err !== null;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmited, setSubmited] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password, name);
    setSubmited(true);
  };
  
  return user ? 
    <div className={(cn())}>
    Вы авторизованы!
    </div> : (
    <Spinner active={isWaiting}>   
      <form className={(cn())} onSubmit={(e) => handleSubmit(e)}>
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
        {(isAuthErr && isSubmited) && <div className={(cn('err'))}>{err}</div>}
        <input className={(cn('inputButton'))} type="submit" value={login} />
      </form>
    </Spinner> 
    )
  }

export default React.memo(LoginForm);

