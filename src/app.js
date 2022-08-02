import React from "react";
import { counter } from "./utils.js";
import "./style.css";

const renderPhrase = (number) => {
  const lastOne = Number(number.toString().slice(-1));
  if (number > 4 && number < 15) {
    return `Выделялось ${number} раз`;
  }
  if (lastOne === 1) return `Выделялось ${number} раз`;
  if ([2, 3, 4].indexOf(lastOne) >= 0) return `Выделялось ${number} раза`;
  return `Выделялось ${number} раз`;
};
/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  // Выбор состояния из store
  const { items } = store.getState();

  return (
    <div className="App">
      <div className="App__head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="Controls">
        <button
          onClick={() => {
            const code = counter();
            store.createItem({ code, title: `Новая запись ${code}` });
          }}
        >
          {" "}
          Добавить{" "}
        </button>
      </div>
      <div className="App__center">
        <div className="List">
          {items.map((item) => (
            <div key={item.code} className="List__item">
              <div
                className={"Item" + (item.selected ? " Item_selected" : "")}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item__number">{item.code}</div>
                <div className="Item__title">
                  {item.count
                    ? `${item.title} | ${renderPhrase(item.count)}`
                    : item.title}
                </div>
                <div className="Item__actions">
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
