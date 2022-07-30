import React from "react";
import { counter, countSelected } from "./utils.js";
import "./style.css";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  // Выбор состояния из store
  const { items } = store.getState();

  // Добавить элемент
  const addItem = () => {
    const code = counter();
    store.createItem({ code, title: `Новая запись ${code}` });
  };

  return (
    <div className="App">
      <div className="App__head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="Controls">
        <button onClick={addItem}>Добавить</button>
      </div>
      <div className="App__center">
        <div className="List">
          {items.map((item) => (
            <ItemComponent key={item.code} item={item} store={store} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Компонент
 * @param store {Store} Состояние приложения
 * @param item {object} Объект элемента
 * @return {React.ReactElement} Виртуальный элемент React
 */
function ItemComponent({ item, store }) {
  // Выбрать элемент
  // Установить количество выделений
  const selectAndCountItem = () => {
    store.selectItem(item.code);
    store.countSelectedItem(item.code);
  };

  // Удалить элемент
  const deleteItem = () => {
    store.deleteItem(item.code);
  };

  return (
    <div className="List__item">
      <div className={"Item" + (item.selected ? " Item_selected" : "")} onClick={selectAndCountItem}>
        <div className="Item__number">{item.code}</div>
        <div className="Item__title">
          {item.title}
          {countSelected(item)}
        </div>
        <div className="Item__actions">
          <button onClick={deleteItem}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default App;
