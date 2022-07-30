import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', statistic:0,},
    {code: counter(), title: 'Некий объект',statistic:0,},
    {code: counter(), title: 'Заголовок',statistic:0,},
    {code: counter(), title: 'Короткое название',statistic:0,},
    {code: counter(), title: 'Запись',statistic:0,},
    {code: counter(), title: 'Пример выделенной записи',statistic:0, selected: true},
    {code: counter(), title: 'Седьмой',statistic:0,},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
