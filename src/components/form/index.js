import React, { useState } from "react";

function Form({ log, setLogin }) {
  const [state, setState] = useState({ login: "", password: "" });

  console.log("state", state);
  console.log("log", log);

  return (
    <div>
      <h3>Вход</h3>
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
        <button
          onClick={(e) => {
            setLogin();
            e.preventDefault();
          }}
        >
          Вход
        </button>
      </form>
    </div>
  );
}

export default React.memo(Form);
