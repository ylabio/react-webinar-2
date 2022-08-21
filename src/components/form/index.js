import React, { useState } from "react";

function Form({ setStateFetch }) {
  const [state, setState] = useState({ login: "", password: "" });

  const handleAction = (e) => {
    e.preventDefault();
    setStateFetch(state);
    setState({ login: "", password: "" });
  };

  return (
    <form>
      <label>
        <input
          value={state.login}
          onChange={(e) => setState({ ...state, login: e.target.value })}
        />
      </label>
      <label>
        <input
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
      </label>
      <button onClick={handleAction}>Войти</button>
    </form>
  );
}

export default React.memo(Form);
