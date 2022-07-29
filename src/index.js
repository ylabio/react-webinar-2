import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Нажмите на любую строку, чтобы ее выделить', selected: false, clicksAmount: 0},
    {code: counter(), title: 'Некий объект', selected: false, clicksAmount: 0},
    {code: counter(), title: 'Заголовок', selected: false, clicksAmount: 0},
    {code: counter(), title: 'Короткое название', selected: false, clicksAmount: 0},
    {code: counter(), title: 'Запись', selected: false, clicksAmount: 0},
    {code: counter(), title: 'Бывший пример выделенной записи', selected: false, clicksAmount: 0},
    {code: counter(), title: 'Седьмой', selected: false, clicksAmount: 0},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);