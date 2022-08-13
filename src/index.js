import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";

<<<<<<< HEAD
// Внешнее состояние
const store = new Store();
=======
const store = new Store({
  items: [
    {code: counter(), title: 'Название товара', price: 100.0},
    {code: counter(), title: 'Книга про React', price: 770},
    {code: counter(), title: 'Конфета', price: 33},
    {code: counter(), title: 'Трактор', price: 7955320},
    {code: counter(), title: 'Телефон iPhone XIXV', price: 120000},
    {code: counter(), title: 'Карандаши цветные', price: 111},
    {code: counter(), title: 'Товар сюрприз', price: 0},
  ],
  cart: {cartItems:[], totalPrice: 0, totalAmount: 0}
});
>>>>>>> 5d46993e8f3051dce5f134bd1e18da55865a61c5

// Корень React приложения
const root = createRoot(document.getElementById('root'));

// Первый рендер (один раз)
root.render(
  <StoreContext.Provider value={store}>
    <App/>
  </StoreContext.Provider>
);
