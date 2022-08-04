import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import {counter} from './utils.js';

const store = new Store({
  items: [
<<<<<<< HEAD
    {code: counter(), title: 'Название товара', price: 100.0},
    {code: counter(), title: 'Книга про React', price: 770},
    {code: counter(), title: 'Конфета', price: 33},
    {code: counter(), title: 'Трактор', price: 7955320},
    {code: counter(), title: 'Телефон iPhone XIXV', price: 120000},
    {code: counter(), title: 'Карандаши цветные', price: 111},
    {code: counter(), title: 'Товар сюрприз', price: 0},
  ]
=======
    {code: counter(), title: 'Название элемента', selectCount: 0},
    {code: counter(), title: 'Некий объект', selectCount: 0},
    {code: counter(), title: 'Заголовок', selectCount: 0},
    {code: counter(), title: 'Короткое название', selectCount: 0},
    {code: counter(), title: 'Запись', selectCount: 0},
    {code: counter(), title: 'Пример выделенной записи', selectCount: 0},
    {code: counter(), title: 'Седьмой', selectCount: 0},
  ],
>>>>>>> master
});

const root = createRoot(document.getElementById('root'));

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
<<<<<<< HEAD
  root.render(<App store={store}/>);
});

// Первый рендер (один раз)
root.render(<App store={store}/>);
=======
  ReactDOM.render(<App store={store} />, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store} />, document.body);
>>>>>>> master
