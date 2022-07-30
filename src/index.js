import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter,selectCounter} from './utils.js';


const store = new Store({
  items: [
    {code: counter(), selectCount: selectCounter(),title: 'Название элемента'},
    {code: counter(), selectCount: selectCounter(),title: 'Некий объект'},
    {code: counter(), selectCount: selectCounter(),title: 'Заголовок'},
    {code: counter(), selectCount: selectCounter(),title: 'Короткое название'},
    {code: counter(), selectCount: selectCounter(),title: 'Запись'},
    {code: counter(), selectCount: selectCounter(),title: 'Пример выделенной записи', selected: true, selectCount: 1},
    {code: counter(), selectCount: selectCounter(), title: 'Седьмой'},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
