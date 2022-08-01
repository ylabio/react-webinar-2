import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from './store.js';
import { counter } from './utils.js';

const store = new Store({
  items: [
    { code: counter(), title: 'Название элемента', selectedCount: 0 },
    { code: counter(), title: 'Некий объект', selectedCount: 0 },
    { code: counter(), title: 'Заголовок', selectedCount: 0 },
    { code: counter(), title: 'Короткое название', selectedCount: 0 },
    { code: counter(), title: 'Запись', selectedCount: 0 },
    {
      code: counter(),
      title: 'Пример выделенной записи',
      selectedCount: 1,
      selected: true,
    },
    { code: counter(), title: 'Седьмой', selectedCount: 0 },
  ],
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store} />, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store} />, document.body);
