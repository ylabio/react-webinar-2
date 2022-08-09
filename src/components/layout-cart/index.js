import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function LayoutCart({children}) {
  return (
    <div className='Layout-cart'>
      {children}
    </div>
  )
}

LayoutCart.propTypes = {
  children: propTypes.node,
}

export default React.memo(LayoutCart);
