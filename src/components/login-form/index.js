import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import { AuthContext } from "../../store/authcontext";
import './style.css';

const LoginForm = (props) => {
    const { enter, inputname, inputpassword, login } = props.options;
    const navigate = useNavigate();
    const cn = bem('LoginForm');
    const { err, logIn } = useContext(AuthContext);
    const [isSubmited, setSubmited] = useState(null);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    return (    
      <form className={(cn())} onSubmit={(e) => {
        e.preventDefault();
        logIn(password, name);
        setSubmited(true);
        history.length <= 2 && navigate('/category=&page=1&limit=10&sort=order&query=');
        (!err && history.length > 2) && navigate(-1);
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
        {(err && isSubmited) && <div className={(cn('err'))}>{err}</div>}
        <input className={(cn('inputButton'))} type="submit" value={login} />
      </form>
    )
  }

export default React.memo(LoginForm);

