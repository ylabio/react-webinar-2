import React from 'react'
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from 'prop-types';

function ProdInfoItem({param, value, ...props}) {
  const cn = bem('InfoItem');

	return (
		<div className={(cn())} {...props}>
			<p>{param}<span className={cn('value')}>{value}</span></p>
		</div>
	)
}
ProdInfoItem.propTypes = {
  param: propTypes.string,
  value: propTypes.any,
};

ProdInfoItem.defaultProps = {
};

export default React.memo(ProdInfoItem)