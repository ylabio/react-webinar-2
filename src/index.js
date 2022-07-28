import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', title_store: 'Название элемента', count: 0},
    {code: counter(), title: 'Некий объект', title_store:'Некий объект', count: 0},
    {code: counter(), title: 'Заголовок', title_store:'Заголовок', count: 0},
    {code: counter(), title: 'Короткое название',title_store:'Короткое название', count: 0},
    {code: counter(), title: 'Запись', title_store: 'Запись', count: 0},
    {code: counter(), title: 'Пример выделенной записи',title_store: 'Пример выделенной записи', count: 0, selected: true},
    {code: counter(), title: 'Седьмой', title_store: 'Седьмой', count: 0},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
