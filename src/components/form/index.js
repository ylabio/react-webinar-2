import React, { useState } from "react";

function Form({ btn, setState, state }) {
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
      {btn}
    </form>
  );
}

export default React.memo(Form);
