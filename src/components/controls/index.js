import React from "react";
import propTypes from "prop-types";
import "./style.css";
import Button from "../button";

function Controls({ totalPrice = 0, showModal }) {
  return (
    <div className="Controls">
      <div>В корзине:</div>
      <span style={{ fontWeight: "bold" }}>2 товара / {totalPrice} ₽</span>
      <Button onClick={() => showModal()}>Перейти</Button>
    </div>
  );
}

// Controls.propTypes = {
//   onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
// }
//
// Controls.defaultProps = {
//   onAdd: () => {} // Значение по умолчанию - функция-заглушка
// }

export default React.memo(Controls);
