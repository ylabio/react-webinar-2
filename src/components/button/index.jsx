import React from 'react';
import propTypes from 'prop-types';

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

Button.propTypes = {
  onClick: propTypes.func,
  children: propTypes.node,
};

export default React.memo(Button);
