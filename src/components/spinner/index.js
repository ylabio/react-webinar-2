import React from 'react';
import propTypes from "prop-types";
import PropTypes from "prop-types";
import './style.css';
import { GridLoader } from 'react-spinners';

function Spinner(props) {

  if (props.active){
    return (
      <div className="Spinner">
        <GridLoader loading={props.active} size={24} color="orange" />
      </div>
    )
  } else {
    return props.children;
  }
}

Spinner.propTypes = {
  active: propTypes.bool.isRequired,
  children: PropTypes.node,
}

export default React.memo(Spinner);
