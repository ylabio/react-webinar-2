import React from "react";
import App from "./app.js";
import Store from "./store.js";
import { counter } from "./utils.js";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

const store = new Store({
  items: [
    { code: counter(), title: "Название элемента" },
    { code: counter(), title: "Некий объект" },
    { code: counter(), title: "Заголовок" },
    { code: counter(), title: "Короткое название" },
    { code: counter(), title: "Запись" },
    { code: counter(), title: "Пример выделенной записи", selected: true },
    { code: counter(), title: "Седьмой" },
  ],
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер (один раз)
root.render(<App store={store} />);
