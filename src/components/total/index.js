import React from 'react';
import propTypes from 'prop-types';
import {getPrice} from '../../utils';
import './style.css';

function Total({sum}) {
  return (
	  <div className='Total'>
		  <div>Итого</div>
		  <div className='Total-sum'>{getPrice(sum)}</div>
    </div>
  )
}

Total.propTypes = {
  basket: propTypes.arrayOf(propTypes.object),
	sum: propTypes.number
}

Total.defaultProps = {
  basket: []
}

export default React.memo(Total);
