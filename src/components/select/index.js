import React, {useCallback} from 'react';
import propTypes from "prop-types";
import './style.css';

function Select(props){

  const onSelect = useCallback((e) => {
    props.onChange(e.target.value);
  }, [props.onChange])

  return (
    <select className="Select" onChange={onSelect} value={props.value}>
      {props.categoryReset ? <option value={''}>Все</option> : null}
      {props.options.map(item => (
        <option key={props.categoryReset? item?._id : item.title} value={props.categoryReset ? item?._id : item.value}>{item.title}</option>
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
