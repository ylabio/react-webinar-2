import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import AuthContainer from './containers/auth-container';
import Store from "./store";
import {StoreContext} from "./store/context";
import App from './app';

// Внешнее состояние
const store = new Store();

// Корень React приложения
const root = createRoot(document.getElementById('root'));

// Первый рендер (один раз)
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <AuthContainer>
        <App/>
      </AuthContainer>
    </BrowserRouter>
  </StoreContext.Provider>
);
