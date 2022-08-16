import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Preloader({ children }) {
  return (
    <div className="Preloader">
      {children}
    </div>
  );
}

Preloader.propTypes = {
  children: propTypes.node
};

Preloader.defaultProps = {
  children: <h2>Loading...</h2>
};

export default React.memo(Preloader);
