import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Menu({ children }) {
  return (
    <div className="Menu">
      {children}
    </div>
  );
}

Menu.propTypes = {
  children: propTypes.node
};

Menu.defaultProps = {
  children: <a href="/">Главная</a>
};

export default React.memo(Menu);