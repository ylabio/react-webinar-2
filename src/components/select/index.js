import React, {useCallback} from 'react';
import propTypes from "prop-types";
import './style.css';

function Select(props){

  const onSelect = useCallback((e) => {
    props.onChange(e.target.value);
  }, [props.onChange])

  return (
    <select className="Select" onChange={onSelect} value={props.value} style={{width: `${props.width}px`|| 'auto'}}>
      {props.options.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func,
  width: propTypes.number,
}

Select.defaultProps = {
  onChange: () => {}
}

export default React.memo(Select);
