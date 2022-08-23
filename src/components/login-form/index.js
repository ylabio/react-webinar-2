import React, { useState, useContext } from "react";
import { cn as bem } from "@bem-react/classname";
import { AuthContext } from "../../store/authcontext";
import './style.css';

const LoginForm = (props) => {
    const { enter, inputname, inputpassword, login } = props.options;
    const cn = bem('LoginForm');
    const { err, logIn } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    return (    
      <form className={(cn())} onSubmit={(e) => {
        e.preventDefault();
        logIn(password, name);
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
        <input className={(cn('inputButton'))} type="submit" value={login} />
        {err && <div className={(cn('err'))}>{err}</div>}
      </form>
    )
  }

export default React.memo(LoginForm);

