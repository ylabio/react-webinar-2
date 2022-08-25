import React, {useCallback} from 'react';
import propTypes from "prop-types";
import './style.css';

function Select(props){

  const onSelect = useCallback((e) => {
    props.onChange(e.target.value);
  }, [props.onChange])

  return (
    <select className="Select" onChange={onSelect} value={props.value}>
      {props.all === undefined ? null : props.all} //Так можно или селект не стоило менять?
      {props.options.map(item => (
        <option key={item.value || item._id} value={item.value || item._id}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func,
  _id: propTypes.any,
}

Select.defaultProps = {
  onChange: () => {}
}

export default React.memo(Select);
