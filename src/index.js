import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', selectionCount: 0, countStr: ''},
    {code: counter(), title: 'Некий объект', selectionCount: 0, countStr: ''},
    {code: counter(), title: 'Заголовок', selectionCount: 0, countStr: ''},
    {code: counter(), title: 'Короткое название', selectionCount: 0, countStr: ''},
    {code: counter(), title: 'Запись', selectionCount: 0, countStr: ''},
    {code: counter(), title: 'Пример выделенной записи', selected: true, selectionCount: 0, countStr: ''},
    {code: counter(), title: 'Седьмой', selectionCount: 0, countStr: ''},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
