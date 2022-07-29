import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";
import Store from "./store.js";
import { counter } from "./utils.js";

const store = new Store({
    items: [
        { code: counter(), title: "Название элемента", clicksCount: 0 },
        { code: counter(), title: "Некий объект", clicksCount: 0 },
        { code: counter(), title: "Заголовок", clicksCount: 0 },
        { code: counter(), title: "Короткое название", clicksCount: 0 },
        { code: counter(), title: "Запись", clicksCount: 0 },
        {
            code: counter(),
            title: "Пример выделенной записи",
            selected: true,
            clicksCount: 1,
        },
        { code: counter(), title: "Седьмой", clicksCount: 0 },
    ],
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
    ReactDOM.render(<App store={store} />, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store} />, document.body);
