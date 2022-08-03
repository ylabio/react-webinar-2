import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';
import {DEFAULT_COUNT} from './constants.js'

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', count: DEFAULT_COUNT},
    {code: counter(), title: 'Некий объект', count: DEFAULT_COUNT},
    {code: counter(), title: 'Заголовок', count: DEFAULT_COUNT},
    {code: counter(), title: 'Короткое название', count: DEFAULT_COUNT},
    {code: counter(), title: 'Запись', count: DEFAULT_COUNT},
    {code: counter(), title: 'Пример выделенной записи', count: DEFAULT_COUNT, selected: true},
    {code: counter(), title: 'Седьмой', count: DEFAULT_COUNT},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
