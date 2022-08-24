import React from 'react';
import propTypes from "prop-types";
import PropTypes from "prop-types";
import './style.css'

function LoginSpinner(props) {
  
  if (props.active){
    return (
      <div>
        {props.children}
      </div>
    )
  } else {
    return <div className='LoginSpinner'>Идет загрузка...</div>;
  }
}

LoginSpinner.propTypes = {
  active: propTypes.bool.isRequired,
  children: PropTypes.node,
}

export default React.memo(LoginSpinner);
