import React, {useCallback} from 'react';
import propTypes from "prop-types";
import './style.css';

function Select(props){

  const onSelect = useCallback((e) => {
    props.onChange(e.target.value);
  }, [props.onChange])

  return (
    <select className="Select" onChange={onSelect} value={props.value}>  { /* это то что щас на экране (по дефолту "по порядку", идет из store) */}
      {props.options.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>  //все остальные, идут из массива который прописан в 1 из контейнеров
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
