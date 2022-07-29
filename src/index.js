import React from 'react';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';
import {createRoot} from 'react-dom/client';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', countOfAllocate: 0},
    {code: counter(), title: 'Некий объект', countOfAllocate: 0},
    {code: counter(), title: 'Заголовок', countOfAllocate: 0},
    {code: counter(), title: 'Короткое название', countOfAllocate: 0},
    {code: counter(), title: 'Запись', countOfAllocate: 0},
    {
      code: counter(),
      title: 'Пример выделенной записи',
      countOfAllocate: 0,
      selected: true
    },
    {code: counter(), title: 'Седьмой', countOfAllocate: 0},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер (один раз)
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App store={store}/>);
