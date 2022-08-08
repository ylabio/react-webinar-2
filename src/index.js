import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from "./store.js";
import { counter } from './utils.js';

const store = new Store({
  items: [
    { code: counter(), title: 'Название товара', price: 100.0, value: 0 },
    { code: counter(), title: 'Книга про React', price: 770, value: 0 },
    { code: counter(), title: 'Конфета', price: 33, value: 0 },
    { code: counter(), title: 'Трактор', price: 7955320, value: 0 },
    { code: counter(), title: 'Телефон iPhone XIXV', price: 120000, value: 0 },
    { code: counter(), title: 'Карандаши цветные', price: 111, value: 0 },
    { code: counter(), title: 'Товар сюрприз', price: 0, value: 0 },
  ],
  cart: [],
  modalStatus: true
});

const root = createRoot(document.getElementById('root'));

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер (один раз)
root.render(<App store={store} />);
