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
  onClick: propTypes.func.isRequired,
  args: propTypes.arrayOf(propTypes.any),
};

export default memo(Button);
