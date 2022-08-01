import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента'},
    {code: counter(), title: 'Некий объект'},
    {code: counter(), title: 'Заголовок'},
    {code: counter(), title: 'Короткое название'},
    {code: counter(), title: 'Запись'},
    {code: counter(), title: 'Пример выделенной записи', selected: false},
    {code: counter(), title: 'Седьмой'},
  ]
});

const root = createRoot(document.getElementById('root'));

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер (один раз)
root.render(<App store={store}/>);
