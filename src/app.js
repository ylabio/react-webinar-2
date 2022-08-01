import React from "react";
import { counter } from "./utils.js";
import "./style.css";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  // Выбор состояния из store
  const { items } = store.getState();

  const declination = (num) => {
    if (num > 11 && num < 15) return "раз";

    if (num > 1 && num < 5) return "раза";
    if (num > 21 && num < 25) return "раза";

    if (String(num).length > 1) {
      if (String(num).slice(-1) === "2") return "раза";
      if (String(num).slice(-1) === "3") return "раза";
      if (String(num).slice(-1) === "4") return "раза";
    }

    return "раз";
  };

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
          Добавить
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
                  {item.title}
                  {!!item.selectCounter &&
                    ` | Выделялось ${item.selectCounter} ${declination(
                      item.selectCounter
                    )}`}
                </div>
                <div className="Item__actions">
                  <button onClick={(e) => store.deleteItem(e, item.code)}>
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
