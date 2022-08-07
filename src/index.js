import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from "./store";

// Внешнее состояние
const store = new Store();

// Корень React приложения
const root = createRoot(document.getElementById('root'));

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер (один раз)
root.render(<App store={store}/>);
