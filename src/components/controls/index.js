import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({children}){
  return (
    <div className='Controls'>
      {children}
    </div>
  )
}

Controls.propTypes = {
  children: propTypes.node
}

Controls.defaultProps = {

}

export default React.memo(Controls);
