import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', cntSelect: 0, selectedCount: ''},
    {code: counter(), title: 'Некий объект', cntSelect: 0, selectedCount: ''},
    {code: counter(), title: 'Заголовок', cntSelect: 0, selectedCount: ''},
    {code: counter(), title: 'Короткое название', cntSelect: 0, selectedCount: ''},
    {code: counter(), title: 'Запись', cntSelect: 0, selectedCount: ''},
    {code: counter(), title: 'Пример выделенной записи', cntSelect: 0, selectedCount: ''},
    {code: counter(), title: 'Седьмой', cntSelect: 0, selectedCount: ''},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
