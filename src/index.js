import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', countOfSelections: 0},
    {code: counter(), title: 'Некий объект', countOfSelections: 0},
    {code: counter(), title: 'Заголовок', countOfSelections: 0},
    {code: counter(), title: 'Короткое название', countOfSelections: 0},
    {code: counter(), title: 'Запись', countOfSelections: 0},
    {code: counter(), title: 'Пример выделенной записи', countOfSelections: 0, selected: true},
    {code: counter(), title: 'Седьмой', countOfSelections: 0},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
