import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', selectionAmount: 0},
    {code: counter(), title: 'Некий объект', selectionAmount: 0},
    {code: counter(), title: 'Заголовок', selectionAmount: 0},
    {code: counter(), title: 'Короткое название', selectionAmount: 0},
    {code: counter(), title: 'Запись', selectionAmount: 0},
    {code: counter(), title: 'Пример выделенной записи', selected: true, selectionAmount: 1},
    {code: counter(), title: 'Седьмой', selectionAmount: 0},
  ]
});

const root = createRoot(document.getElementById('root'));

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер (один раз)
root.render(<App store={store}/>);
