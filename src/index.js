import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from "./store.js";
import { counter } from './utils.js';

const store = new Store({
  items: [
    { code: counter(), title: 'Название товара', price: 100.0, addCount: 0 },
    { code: counter(), title: 'Книга про React', price: 770, addCount: 0 },
    { code: counter(), title: 'Конфета', price: 33, addCount: 0 },
    { code: counter(), title: 'Трактор', price: 7955320, addCount: 0 },
    { code: counter(), title: 'Телефон iPhone XIXV', price: 120000, addCount: 0 },
    { code: counter(), title: 'Карандаши цветные', price: 111, addCount: 0 },
    { code: counter(), title: 'Товар сюрприз', price: 0, addCount: 0 },
  ],
  cartItems: [],
  showModal: false,
  totalPrice: 0,
  totalCount: 0,
});

const root = createRoot(document.getElementById('root'));

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер (один раз)
root.render(<App store={store} />);
