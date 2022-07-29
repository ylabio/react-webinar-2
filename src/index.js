import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', click: 0},
    {code: counter(), title: 'Некий объект', click: 0},
    {code: counter(), title: 'Заголовок', click: 0},
    {code: counter(), title: 'Короткое название', click: 0},
    {code: counter(), title: 'Запись', click: 0},
    {code: counter(), title: 'Пример выделенной записи', click: 0, selected: true},
    {code: counter(), title: 'Седьмой', click: 0},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
