import React, { memo } from "react";
import propTypes from "prop-types";

function Button({ onClick, label, args }) {
  return (
    <button onClick={() => (args ? onClick(...args) : onClick())}>
      {label}
    </button>
  );
}

Button.propTypes = {
  onClick: propTypes.func,
  label: propTypes.string,
  args: propTypes.arrayOf(propTypes.any),
};

Button.defaultProps = {
  onClick: () => {},
  label: "Кнопка",
  args: [],
};

export default memo(Button);
