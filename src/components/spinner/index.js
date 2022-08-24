import React from 'react';
import propTypes from "prop-types";
import './style.css';

function Spinner(props) {

  if (props.active){
    return (
      <div className="Spinner">
        {props.children}
      </div>
    )
  } else {
    return props.children;
  }
}

Spinner.propTypes = {
  active: propTypes.bool.isRequired,
  children: propTypes.node,
}

export default React.memo(Spinner);
