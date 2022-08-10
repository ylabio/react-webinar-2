import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Button({title, callback}) {
  return (
	  <div className='Button'>
		  <button onClick={callback}>
			  {title}
      </button>
    </div>
  )
}

Button.propTypes = {
  callback: propTypes.func,
  title: propTypes.string
}

Button.defaultProps = {
  callback: () => {}
}

export default React.memo(Button);
