import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', clicked: 0},
    {code: counter(), title: 'Некий объект', clicked: 0},
    {code: counter(), title: 'Заголовок', clicked: 0},
    {code: counter(), title: 'Короткое название', clicked: 0},
    {code: counter(), title: 'Запись', clicked: 0},
    {code: counter(), title: 'Пример выделенной записи', clicked: 1 , selected: true},
    {code: counter(), title: 'Седьмой', clicked: 0},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
