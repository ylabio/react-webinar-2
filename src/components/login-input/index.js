import React, { useCallback } from 'react';
import Input from '../input';
import './style.css';
import propTypes from 'prop-types';

function LoginInput({title, value, onChange, onFocus, type}) {
  const callbacks = {
    onChangeFn: useCallback((f) => onChange(f), [onChange]),
    onFocus: useCallback((f) => onFocus(f), [onFocus])
  }
  return (
    <div className='LoginInput'>
      <div className='LoginInput-title'>{title}</div>
      <Input
        value={value}
        onChange={callbacks.onChangeFn}
        onFocus={callbacks.onFocus}
        throttle={false}
        type={type}
      />
      <div className='gap'></div>
    </div>
  )
};

LoginInput.propTypes = {
  title: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  onFocus: propTypes.func,
  type: propTypes.string
};

LoginInput.defaultProps = {
};

export default React.memo(LoginInput);