import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter, selectedCounter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', timesSelected: 0},
    {code: counter(), title: 'Некий объект', timesSelected: 0},
    {code: counter(), title: 'Заголовок', timesSelected: 0},
    {code: counter(), title: 'Короткое название', timesSelected: 0},
    {code: counter(), title: 'Запись', timesSelected: 0},
    {code: counter(), title: 'Пример выделенной записи', selected: true, timesSelected: 0},
    {code: counter(), title: 'Седьмой', timesSelected: 0},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
