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

  const itemText = (clickCount) => {
    if (clickCount === 12 || clickCount === 13 || clickCount === 14) {
      return clickCount !== 0 ? ` | Выделялся ${clickCount} раз` : null;
    }
    if (
      clickCount % 10 === 2 ||
      clickCount % 10 === 3 ||
      clickCount % 10 === 4
    ) {
      return clickCount !== 0 ? ` | Выделялся ${clickCount} разa` : null;
    }
    return clickCount !== 0 ? ` | Выделялся ${clickCount} раз` : null;
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
                onClick={(e) => store.selectItem(item.code, e)}
              >
                <div className="Item__number">{item.code}</div>
                <div className="Item__title">
                  {item.title} {itemText(item.clickCount)}
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
