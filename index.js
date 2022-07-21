import App from './app.js';
import {counter, render} from './utils.js';
import Store from "./store.js";

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента'},
    {code: counter(), title: 'Некий объект'},
    {code: counter(), title: 'Заголовок'},
    {code: counter(), title: 'Короткое название'},
    {code: counter(), title: 'Запись'},
    {code: counter(), title: 'Пример выделенной записи', selected: true},
    {code: counter(), title: 'Седьмой'},
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  render(document.body, App({store}))
});

// Первый рендер (один раз)
render(document.body, App({store}));
