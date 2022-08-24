import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Input from '../input'

function FormInput({label, value, onChange, type}) {
  const cn = bem('InputBlock');

  return (
    <div className={cn()}>
      <label>{label}</label>
      <Input value={value} onChange={onChange} type={type}/>
    </div>
  )
}

Input.propTypes = {
  label: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func
}

Input.defaultProps = {
}

export default React.memo(FormInput);