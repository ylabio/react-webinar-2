import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', counterClick: null},
    {code: counter(), title: 'Некий объект', counterClick: null},
    {code: counter(), title: 'Заголовок', counterClick: null },
    {code: counter(), title: 'Короткое название', counterClick: null},
    {code: counter(), title: 'Запись', counterClick: null},
    {code: counter(), title: 'Пример выделенной записи', counterClick: 1, selected: true},
    {code: counter(), title: 'Седьмой', counterClick: null},
  ],
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
