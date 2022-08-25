import React from "react";
import propTypes from "prop-types";
import './style.css';

function SelectSorting(props){

  return (
    <>
      <select className="Sorting" onChange={props.onChange} value={props.value}>
        {props.options.map(item => (
          <option key={item.value} value={item.value}>{item.title}</option> 
          )
        )}
      </select>
    </>
  )
}

SelectSorting.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func,
  parsing: propTypes.bool
}

SelectSorting.defaultProps = {
  onChange: () => {}
}

export default React.memo(SelectSorting);
