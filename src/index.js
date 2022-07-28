import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', selectionValue: 0},
    {code: counter(), title: 'Некий объект', selectionValue: 0},
    {code: counter(), title: 'Заголовок', selectionValue: 0},
    {code: counter(), title: 'Короткое название', selectionValue: 0},
    {code: counter(), title: 'Запись', selectionValue: 0},
    {code: counter(), title: 'Пример выделенной записи', selectionValue: 0, selected: true},
    {code: counter(), title: 'Седьмой', selectionValue: 0},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
