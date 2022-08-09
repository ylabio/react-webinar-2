import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название товара', price: 100, countOnBasket: 0},
    {code: counter(), title: 'Книга про React', price: 770, countOnBasket: 0},
    {code: counter(), title: 'Конфета', price: 33, countOnBasket: 0},
    {code: counter(), title: 'Трактор', price: 7955320, countOnBasket: 0},
    {code: counter(), title: 'Телефон iPhone XIXV', price: 120000, countOnBasket: 0},
    {code: counter(), title: 'Карандаши цветные', price: 111, countOnBasket: 0},
    {code: counter(), title: 'Товар сюрприз', price: 0, countOnBasket: 0},
  ],
  basketItems: [],
  totalPrice: 0
});

const root = createRoot(document.getElementById('root'));

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер (один раз)
root.render(<App store={store}/>);
