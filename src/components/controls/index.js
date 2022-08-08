import React from "react";
import propTypes from "prop-types";
import "./style.css";

function Controls({ handlerClick, textButton }) {
  return (
    <div className="Controls">
      <button onClick={handlerClick}>{textButton}</button>
    </div>
  );
}

Controls.propTypes = {
  handlerClick: propTypes.func.isRequired, // Обязательное свойство - функция
  textButton: propTypes.string.isRequired,
};

Controls.defaultProps = {
  handlerClick: () => {}, // Значение по умолчанию - функция-заглушка
  textButton: "Кнопка", // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);
