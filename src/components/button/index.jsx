import React from 'react';
import propTypes from 'prop-types';

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

Button.propTypes = {
  onClick: propTypes.func.isRequired,
  children: propTypes.node,
};

Button.defaultProps = {
  onClick: () => {},
};

export default React.memo(Button);
