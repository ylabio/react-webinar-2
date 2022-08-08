import React from 'react';
import propTypes from 'prop-types';
import {getSum, getPrice} from '../../utils';
import './style.css';

function Total({basket}) {
	const sum = getSum(basket);
	return (
		<div className='Total'>
			<div>Итого</div>
			<div className={'Total-sum'}>{getPrice(sum)}</div>
		</div>
	)
}

Total.propTypes = {
	basket: propTypes.arrayOf(propTypes.object)
}

Total.defaultProps = {
	basket: []
}

export default React.memo(Total);
