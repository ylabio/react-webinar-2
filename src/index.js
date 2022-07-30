import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";
import Store from "./store.js";
import { counter } from "./utils.js";

const store = new Store({
  items: [
    { code: counter(), title: "Название элемента", times_selected: 0 },
    { code: counter(), title: "Некий объект", times_selected: 0 },
    { code: counter(), title: "Заголовок", times_selected: 0 },
    { code: counter(), title: "Короткое название", times_selected: 0 },
    { code: counter(), title: "Запись", times_selected: 0 },
    {
      code: counter(),
      title: "Пример выделенной записи",
      selected: true,
      times_selected: 1,
    },
    { code: counter(), title: "Седьмой", times_selected: 0 },
  ],
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store} />, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store} />, document.body);
