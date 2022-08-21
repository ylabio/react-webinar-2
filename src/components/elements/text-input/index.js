import React from "react";
import propTypes from "prop-types";

const TextInput = ({value, name, onChange, type}) => {
    return (
    <input value={value}  onChange={onChange} type={type} name={name}/>
    );
};

TextInput.propTypes = {
  value: propTypes.string,
  onChange: propTypes.func,
  type: propTypes.string,
  name: propTypes.string,
}

TextInput.defaultProps = {
  onChange: () => {},
}

export default TextInput;
