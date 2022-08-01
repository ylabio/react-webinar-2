import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', select_count: 0},
    {code: counter(), title: 'Некий объект', select_count: 0},
    {code: counter(), title: 'Заголовок', select_count: 0},
    {code: counter(), title: 'Короткое название', select_count: 0},
    {code: counter(), title: 'Запись', select_count: 0},
    {code: counter(), title: 'Пример выделенной записи', selected: true, select_count: 1},
    {code: counter(), title: 'Седьмой', select_count: 0},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
