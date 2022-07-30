import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', amount: 0},
    {code: counter(), title: 'Некий объект', amount: 0},
    {code: counter(), title: 'Заголовок', amount: 0},
    {code: counter(), title: 'Короткое название', amount: 0},
    {code: counter(), title: 'Запись', amount: 0},
    {code: counter(), title: 'Пример выделенной записи', amount: 0, selected: true},
    {code: counter(), title: 'Седьмой', amount: 0},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
