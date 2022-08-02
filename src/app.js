import React from "react";
import { counter } from "./utils.js";
import "./style.css";
import ItemList from "./itemList.js";

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
            <ItemList item={item} store={store} counter={counter} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
