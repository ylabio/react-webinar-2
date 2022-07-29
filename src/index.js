import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from './store.js';
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', selectCount: 0},
    {code: counter(), title: 'Некий объект', selectCount: 0},
    {code: counter(), title: 'Заголовок', selectCount: 0},
    {code: counter(), title: 'Короткое название', selectCount: 0},
    {code: counter(), title: 'Запись', selectCount: 0},
    {code: counter(), title: 'Пример выделенной записи', selectCount: 0},
    {code: counter(), title: 'Седьмой', selectCount: 0},
  ],
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store} />, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store} />, document.body);
