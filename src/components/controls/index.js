import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls(props){
  return (
    <div className='Controls'>
      {props.children}
    </div>
  )
}

Controls.propTypes = {
  children: propTypes.node
};

export default React.memo(Controls);
