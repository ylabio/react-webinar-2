import React from "react";
import propTypes from "prop-types";
import "./style.css";

function Controls({ info, onShowModal }) {
  return (
    <div className="Controls">
      <span> В корзине: </span>
      <span>{info}</span>
      <button onClick={onShowModal}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  info: propTypes.string.isRequired,
  onShowModal: propTypes.func.isRequired,
};

export default React.memo(Controls);
