import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const COUNTER_INITIAL_VALUE=0

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента',counter:COUNTER_INITIAL_VALUE},
    {code: counter(), title: 'Некий объект',counter:COUNTER_INITIAL_VALUE},
    {code: counter(), title: 'Заголовок',counter:COUNTER_INITIAL_VALUE},
    {code: counter(), title: 'Короткое название',counter:COUNTER_INITIAL_VALUE},
    {code: counter(), title: 'Запись',counter:COUNTER_INITIAL_VALUE},
    {code: counter(), title: 'Пример выделенной записи', selected: true,counter:COUNTER_INITIAL_VALUE+1},
    {code: counter(), title: 'Седьмой',counter:COUNTER_INITIAL_VALUE},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
