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

  const makeItemClickHandler = (item, handler) => () => {
    handler(item);
  };

  const handleDeleteButtonClick = (item) => {
    store.deleteItem(item.code);
  };

  const handleCreateButtonClick = () => {
    const code = counter();
    store.createItem({ code, title: `Новая запись ${code}` });
  };

  const handleItemClick = (item) => {
    store.selectItem(item.code);
  };

  const listItems = items.map((item) => (
    <div key={item.code} className="List__item">
      <div
        className={"Item" + (item.selected ? " Item_selected" : "")}
        onClick={makeItemClickHandler(item, handleItemClick)}
      >
        <div className="Item__number">{item.code}</div>
        <div className="Item__title">{item.title}</div>
        <div className="Item__actions">
          <button onClick={makeItemClickHandler(item, handleDeleteButtonClick)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="App">
      <div className="App__head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="Controls">
        <button onClick={handleCreateButtonClick}>Добавить</button>
      </div>
      <div className="App__center">
        <div className="List">{listItems}</div>
      </div>
    </div>
  );
}

export default App;
