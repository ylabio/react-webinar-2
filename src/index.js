import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', count: false}, /* Добавил count в каждый элемент */
    {code: counter(), title: 'Некий объект', count: false},
    {code: counter(), title: 'Заголовок', count: false},
    {code: counter(), title: 'Короткое название', count: false},
    {code: counter(), title: 'Запись', count: false},
    {code: counter(), title: 'Пример выделенной записи', selected: true, count: false},
    {code: counter(), title: 'Седьмой', count: false},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
