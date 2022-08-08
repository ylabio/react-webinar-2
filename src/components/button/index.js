import React from "react";
import propTypes from "prop-types";

function Button(props) {
  return (
    <button className={props.class} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

Button.propTypes = {
  class: propTypes.string,
  onClick: propTypes.func.isRequired,
  text: propTypes.string,
};

Button.defaultProps = {
  class: "",
  onClick: () => {}, // Значение по умолчанию - функция-заглушка
  text: "",
};

export default React.memo(Button);