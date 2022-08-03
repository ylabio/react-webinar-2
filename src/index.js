import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from './store.js';
import { counter } from './utils.js';

const store = new Store({
  items: [
    { code: counter(), title: 'Название элемента', count: '' },
    { code: counter(), title: 'Некий объект', count: '' },
    { code: counter(), title: 'Заголовок', count: ''},
    { code: counter(), title: 'Короткое название', count: '' },
    { code: counter(), title: 'Запись', count: ''},
    { code: counter(), title: 'Пример выделенной записи', count: '' },
    { code: counter(), title: 'Седьмой', count: '' },
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render( < App store = { store }
    />, document.body);
  });

// Первый рендер (один раз)
ReactDOM.render( < App store = { store }
  />, document.body);