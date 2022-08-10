import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CustomButton({children, onClick}) {
  const cn = bem('CustomButton');

  return (
    <button className={cn()} onClick={onClick}>
      {children}
    </button>
  )
}

CustomButton.propTypes = {
  children: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired
}

export default CustomButton;