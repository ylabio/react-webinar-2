import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', counter: 0, selected: false},
    {code: counter(), title: 'Некий объект', counter: 0, selected: false},
    {code: counter(), title: 'Заголовок', counter: 0, selected: false},
    {code: counter(), title: 'Короткое название', counter: 0, selected: false},
    {code: counter(), title: 'Запись', counter: 0, selected: false},
    {code: counter(), title: 'Пример выделенной записи', counter: 0, selected: false},
    {code: counter(), title: 'Седьмой', counter: 0, selected: false},
  ]
});


// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
