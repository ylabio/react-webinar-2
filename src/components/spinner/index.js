import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Spinner(props) {

  if (props.active) {
    return (
      <div className="Spinner">
        {props.children}
      </div>
    );
  } else {
    return props.children;
  }
}

Spinner.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default React.memo(Spinner);
