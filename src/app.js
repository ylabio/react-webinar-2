import React from "react";
import { counter } from "./utils.js";
import plural from "plural-ru";
import "./style.css";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  // Выбор состояния из store
  const { items } = store.getState();
  const deleteItemHandler = (e, item) => {
    e.stopPropagation();
    store.deleteItem(item);
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
                  <span>{item.title}</span>
                  {item.selections && (
                    <span className="Item__selections">
                      {`| Выделялось ${item.selections}
                      ${plural(item.selections, "раз", "раза", "раз")}`}
                    </span>
                  )}
                </div>

                <div className="Item__actions">
                  <button onClick={(e) => deleteItemHandler(e, item.code)}>
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
