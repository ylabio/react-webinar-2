import React from "react";
import { cn as bem } from "@bem-react/classname";
import CardItem from "../card-item";
import "./style.css";
import { calculatePrice, changeNumber } from "../../utils";
import propTypes from "prop-types";

const CardList = ({ items, onCardItemDelete }) => {
  const cn = bem("Card-list");

  return (
    <>
      <ul className={cn()}>
        {items.map((item, index) => (
          <CardItem
            index={index}
            key={item.code}
            className={cn("Item")}
            item={item}
            onCardItemDelete={onCardItemDelete}
          />
        ))}
      </ul>
      <div className={cn("total")}>
        <span>Итого</span>
        <span>{changeNumber(calculatePrice(items))} ₽</span>
      </div>
    </>
  );
};
CardList.propTypes = {
  items: propTypes.array.isRequired,
  onCardItemDelete: propTypes.func.isRequired,
  calculatePrice: propTypes.func.isRequired,
  changeNumber: propTypes.func.isRequired,
};

CardList.defaultProps = {
  items: [],
  onCardItemDelete: () => {},
  calculatePrice: () => {},
  changeNumber: () => {},
};
export default React.memo(CardList);
