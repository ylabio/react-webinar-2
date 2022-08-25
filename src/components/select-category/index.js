import React from 'react';
import propTypes from "prop-types";
import './style.css';
import parser from '../../utils/select-parser';

function SelectCategory(props){

  return (
    <>
      <select className="Select" onChange={props.onChange} value={props.value}>
        {parser(props.options).map(item => (
          <option key={item.value} value={item.value}>{`${item.dashes != null? item.dashes : ''}${item.title}`}</option> 
          )
        )}
      </select>
    </>
  )
}

SelectCategory.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func,
}

SelectCategory.defaultProps = {
  onChange: () => {}
}

export default React.memo(SelectCategory);
