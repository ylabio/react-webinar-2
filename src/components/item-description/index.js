import React, { useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";

const ItemDescription = ({ item, onAdd, loading }) => {
  const cn = bem("ItemDescription");

  const callbacks = {
    onAdd: useCallback((e) => onAdd(item._id), [onAdd, item]),
  };

  if (loading) {
    return (
      <div className={cn()}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={cn()}>
      <div className={cn("desc")}>{item.description}</div>
      <div className={cn("desc-country")}>
        Страна производитель: <b>{item.maidIn?.title}</b>
      </div>
      <div className={cn("category")}>
        Категория: <b>{item.category?.title}</b>
      </div>
      <div className={cn("year-of-issue")}>
        Год выпуска: <b>{item.edition}</b>
      </div>
      <div className={cn("price")}>
        <h3>Цена: {item.price} ₽</h3>
      </div>
      <div>
        <button onClick={callbacks.onAdd} className={cn("add-button")}>
          Добавить
        </button>
      </div>
    </div>
  );
};

ItemDescription.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
};

ItemDescription.defaultProps = {
  onAdd: () => {},
};

export default React.memo(ItemDescription);
