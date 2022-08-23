import React, { useState } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Form({ setStateFetch, user }) {
  const [state, setState] = useState({ login: "", password: "" });

  const cn = bem("Form");

  const handleAction = (e) => {
    e.preventDefault();
    setStateFetch(state);
    setState({ login: "", password: "" });
  };

  return (
    <form className={cn()}>
      <label>
        <h5>Логин</h5>
        <input
          value={state.login}
          onChange={(e) => setState({ ...state, login: e.target.value })}
          type="text"
        />
      </label>
      <label>
        <h5>Пароль</h5>
        <input
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          type="password"
        />
      </label>
      <div>{user.error && user.error}</div>
      <button onClick={handleAction}>Войти</button>
    </form>
  );
}

export default React.memo(Form);
