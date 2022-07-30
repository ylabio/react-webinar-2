import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter, counterSelection} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', countSelected: 0},
    {code: counter(), title: 'Некий объект', countSelected: 0},
    {code: counter(), title: 'Заголовок', countSelected: 0},
    {code: counter(), title: 'Короткое название', countSelected: 0},
    {code: counter(), title: 'Запись', countSelected: 0},
    {code: counter(), title: 'Пример выделенной записи', countSelected: 0},
    {code: counter(), title: 'Седьмой', countSelected: 0},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
