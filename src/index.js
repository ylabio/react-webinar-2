import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', countSelect: null},
    {code: counter(), title: 'Некий объект', countSelect: null},
    {code: counter(), title: 'Заголовок', countSelect: null},
    {code: counter(), title: 'Короткое название', countSelect: null},
    {code: counter(), title: 'Запись', countSelect: null},
    {code: counter(), title: 'Пример выделенной записи', selected: true, countSelect: 1},
    {code: counter(), title: 'Седьмой', countSelect: null},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
