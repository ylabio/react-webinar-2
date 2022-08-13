import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";
import Store from "./store";
import { StoreContext } from "./store/context";

// Внешнее состояние
const store = new Store();

// Корень React приложения
const root = createRoot(document.getElementById("root"));

// Первый рендер (один раз)
root.render(
  <StoreContext.Provider value={store}>
    <Router>
      <App />
    </Router>
  </StoreContext.Provider>
);
