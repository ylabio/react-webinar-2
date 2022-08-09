import React from "react";
import propTypes from "prop-types";
import "./style.css";

function Controls({ isShow }) {
  return (
    <div className="Controls">
      <button onClick={isShow}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  isShow: propTypes.func.isRequired, // Обяхательное свойство - функция
};

Controls.defaultProps = {
  isShow: () => {}, // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);
