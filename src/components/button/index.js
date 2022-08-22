import React from "react";
import propTypes from 'prop-types';

function Button({callback, title}) {
  return(
    <button onClick={callback}>{title}</button>
  );
}

Button.propTypes = {
  callback: propTypes.func.isRequired,
  title: propTypes.string.isRequired
}

export default React.memo(Button)