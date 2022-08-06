import React from "react";
import propTypes from "prop-types";
import plural from "plural-ru";
import "./style.css";
import { calculatePrice, changeNumber } from "../../utils";

function Controls({ onShowModal, cardItems }) {
  // const calculatePrice = (orders) => {
  //   if (orders === undefined) {
  //     return 0;
  //   } else if (orders.length === 0) {
  //     return 0;
  //   } else {
  //     return orders.reduce((acc, curr) => {
  //       return acc + curr.price * curr.count;
  //     }, 0);
  //   }
  // };

  const calculateCount = () => {
    if (cardItems === undefined) {
      return 0;
    } else if (cardItems.length === 0) {
      return 0;
    } else {
      return cardItems.reduce((acc, curr) => {
        return acc + curr.count;
      }, 0);
    }
  };

  return (
    <div className="Controls">
      <span> В корзине: </span>
      <span>
        {!cardItems.length
          ? "пусто"
          : `${calculateCount(cardItems)} ${plural(
              calculateCount(cardItems),
              "товар",
              "товара",
              "товаров"
            )} / ${changeNumber(calculatePrice(cardItems))} ₽`}
      </span>
      <button onClick={onShowModal}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired, // Обяхательное свойство - функция
  onShowModal: propTypes.func.isRequired,
  calculatePrice: propTypes.func.isRequired,
  changeNumber: propTypes.func.isRequired,
};

Controls.defaultProps = {
  onAdd: () => {}, // Значение по умолчанию - функция-заглушка
  onShowModal: () => {},
  calculatePrice: () => {},
  changeNumber: () => {},
};

export default React.memo(Controls);
