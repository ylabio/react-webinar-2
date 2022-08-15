import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Navbar({ children }) {
  return (
    <div className="Navbar">
      {children}
    </div>
  );
}

Navbar.propTypes = {
  children: propTypes.node
};

Navbar.defaultProps = {
  children: <a href="/">Главная</a>
};

export default React.memo(Navbar);
