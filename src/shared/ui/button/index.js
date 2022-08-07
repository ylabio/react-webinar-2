import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Button({
  width, 
  height, 
  text,
  ...props
}) {
  const cn = bem('UI');

  const styles = {
    width,
    height,
  };

  return (
    <button  
      className={cn('button')} 
      style={styles} 
      {...props}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  width: propTypes.string,
  height: propTypes.string,
  text: propTypes.string.isRequired,
}

Button.defaultProps = {
  width: '80px',
  height: '21px',
  text: '',
}

export default React.memo(Button);