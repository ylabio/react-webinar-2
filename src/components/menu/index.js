import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function Menu({ children }) {
  return (
    <div className="Menu">
      <Link to='/'>Главная</Link>
      {children}
    </div>
  );
}

Menu.propTypes = {
  children: propTypes.node
};

export default React.memo(Menu);