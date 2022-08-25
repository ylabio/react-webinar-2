import React, {useCallback} from 'react';
import propTypes from "prop-types";
import './style.css';

function Select({options, value, onChange}){

  const onSelect = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange])

  return (
    <select className="Select" onChange={onSelect} value={value}>
      {options.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func
}

Select.defaultProps = {
  onChange: () => {}
}

export default React.memo(Select);
