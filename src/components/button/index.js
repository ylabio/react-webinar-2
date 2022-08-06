import React from 'react';
import './style.css';

function Button({ children, ...props }) {
  return (
    <button className='Button' {...props}>
      {children}
    </button>
  )
}

export default React.memo(Button);