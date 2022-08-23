import React from 'react';
import propTypes from "prop-types";
import PropTypes from "prop-types";
import './style.css';
import {HashLoader} from 'react-spinners';

function Spinner(props) {

  if (props.active){
    return (
      <div className="Spinner">
        <HashLoader loading={props.loading}
                      color='purple'
                      size={120}
        />
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
