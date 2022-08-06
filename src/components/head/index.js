import React from 'react';
import propTypes from 'prop-types';
import style from './style.css';

function Head({title, button}){
  return (
	  <div className='Head'>
		  <h1>{title}</h1>
		  {button}
	  </div>
  );
}
export default React.memo(Head);

Head.propTypes = {
	button: propTypes.node,
	title: propTypes.string
}
