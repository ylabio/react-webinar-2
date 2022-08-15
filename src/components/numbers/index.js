import React from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

const cn = bem('Number');

function Number({className, number, setPage}){
  return (
    <button className={cn(className)} onClick={setPage} data-number={number}>
		  {number}
	  </button>
	)
}

Number.propTypes={
  number: propTypes.oneOfType([propTypes.number, propTypes.string]),
  setPage: propTypes.func
}

Number.defaultProps={
  number: 1,
  setPage: ()=>{}
}

export default React.memo(Number);
