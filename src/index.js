import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Ctx } from "./store";

ReactDOM.render(
  <Ctx.Provider>
    <App />
  </Ctx.Provider>, document.body
);
