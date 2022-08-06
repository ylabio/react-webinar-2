import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';
import {v4} from 'uuid';

const store = new Store({
  items: [
    {code: counter(), id: v4(), title: 'Название товара', price: 100.0},
    {code: counter(), id: v4(), title: 'Книга про React', price: 770},
    {code: counter(), id: v4(), title: 'Конфета', price: 33},
    {code: counter(), id: v4(), title: 'Трактор', price: 7955320},
    {code: counter(), id: v4(), title: 'Телефон iPhone XIXV', price: 120000},
    {code: counter(), id: v4(), title: 'Карандаши цветные', price: 111},
    {code: counter(), id: v4(), title: 'Товар сюрприз', price: 0},
  ],
  cart: [],
});

const root = createRoot(document.getElementById('root'));

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер (один раз)
root.render(<App store={store}/>);
