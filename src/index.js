import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import Store from "./store.js";
import { counter } from "./utils.js";

const store = new Store({
  items: [
    { code: counter(), title: "Название элемента", cntCall: 0 },
    { code: counter(), title: "Некий объект", cntCall: 0 },
    { code: counter(), title: "Заголовок", cntCall: 0 },
    { code: counter(), title: "Короткое название", cntCall: 0 },
    { code: counter(), title: "Запись", cntCall: 0 },
    { code: counter(), title: "Пример выделенной записи", cntCall: 0 },
    { code: counter(), title: "Седьмой", cntCall: 0 }
  ]
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store} />, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store} />, document.body);
