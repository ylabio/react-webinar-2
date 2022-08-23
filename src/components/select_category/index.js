import React, {useCallback} from 'react';
import propTypes from "prop-types";
import './style.css';

function SelectCategory(props){

  const onSelect = useCallback((e) => {
    props.onChange(e.target.value);
  }, [props.onChange])

  console.log(props.value)

  return (
    <select className="Select" onChange={onSelect} value={props.value}>
      {props?.options.map(item => (
        <option key={item?.value} value={item?.value}>{item?.title}</option>
      ))}
    </select>
  )
}

SelectCategory.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.string,
  onChange: propTypes.func
}

SelectCategory.defaultProps = {
  onChange: () => {},
}

export default React.memo(SelectCategory);
