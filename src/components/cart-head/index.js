import React from "react";
import propTypes from "prop-types";
import Button from "../button";
import "./style.css";

function CartHead({ onClick }) {
  return (
    <>
      <h1>Корзина</h1>
      <Button class="btn-cart" text="Закрыть" onClick={onClick} />
    </>
  );
}

CartHead.propTypes = {
  onClick: propTypes.func.isRequired,
};

CartHead.defaultProps = {
  onClick: () => {}, // Значение по умолчанию - функция-заглушка
};

export default React.memo(CartHead);