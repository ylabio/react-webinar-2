import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";

function ItemInfo(props) {
  const { description, country, category, edition, price, id } = props.select;
  const cn = bem("Item_info");

  return (
    <div className={cn()}>
      <div className={cn("description")}>{description}</div>
      <div className={cn("country")}>
        Страна производитель: <span> {country}</span>
      </div>
      <div className={cn("category")}>
        Категория: <span> {category}</span>
      </div>
      <div className={cn("edition")}>
        Год выпуска: <span> {edition}</span>
      </div>
      <div className={cn("price")}>Цена: {price} ₽</div>
      <button onClick={() => props.addToBasket(id)}>Добавить</button>
    </div>
  );
}

ItemInfo.propTypes = {
  select: propTypes.object.isRequired,
  addToBasket: propTypes.func.isRequired,
};

export default ItemInfo;
