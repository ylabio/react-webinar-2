import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";
import {BrowserRouter} from "react-router-dom";
import {LocalisationProvider} from "l10n";

// Внешнее состояние
const store = new Store();

// Корень React приложения
const root = createRoot(document.getElementById('root'));

// Первый рендер (один раз)
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <LocalisationProvider>
        <App/>
      </LocalisationProvider>
    </BrowserRouter>
  </StoreContext.Provider>
);
