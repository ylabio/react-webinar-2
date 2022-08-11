import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.js";
import Store from "./store.js";
import { nanoid } from "nanoid";

const store = new Store({
  items: [
    { code: nanoid(), title: "Название товара", price: 100.0 },
    { code: nanoid(), title: "Книга про React", price: 770 },
    { code: nanoid(), title: "Конфета", price: 33 },
    { code: nanoid(), title: "Трактор", price: 7955320 },
    { code: nanoid(), title: "Телефон iPhone XIXV", price: 120000 },
    { code: nanoid(), title: "Карандаши цветные", price: 111 },
    { code: nanoid(), title: "Товар сюрприз", price: 0 },
  ],
  card: [],
  modal: false,
  info: "пусто",
});

const root = createRoot(document.getElementById("root"));

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер (один раз)
root.render(<App store={store} />);
