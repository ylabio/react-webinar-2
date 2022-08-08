import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item({ item, itemClick }) {
  const cn = bem("Item");

  return (
    <div className={cn()}>
      <div className={cn("number")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{item.price.toLocaleString("ru-RU")} ₽</div>
      {item.total && <div className={cn("total")}>{item.total} шт</div>}
      <div className={cn("actions")}>
        <button onClick={() => itemClick(item.total ? item.code : item)}>
          {item.total ? "Удалить" : "Добавить"}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  itemClick: propTypes.func,
};

Item.defaultProps = {
  itemClick: () => {},
};

export default React.memo(Item);
