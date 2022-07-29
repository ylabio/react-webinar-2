import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', marked: 0},
    {code: counter(), title: 'Некий объект', marked: 0},
    {code: counter(), title: 'Заголовок', marked: 0},
    {code: counter(), title: 'Короткое название', marked: 0},
    {code: counter(), title: 'Запись', marked: 0},
    {code: counter(), title: 'Пример выделенной записи', marked: 0},
    {code: counter(), title: 'Седьмой', marked: 0},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
