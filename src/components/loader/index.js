import React from 'react';
import propTypes from 'prop-types';

import { Bars } from 'react-loader-spinner';

import './style.css';

function Loader({ color, height, width }) {
	return (
		<div className="center">
			<Bars color={color} height={height} width={width} />
		</div>
	);
}

Loader.propTypes = {
	color: propTypes.string,
	width: propTypes.number,
	height: propTypes.number,
};

Loader.defaultProps = {
	color: '#00BFFF',
	width: 200,
	height: 200,
};

export default React.memo(Loader);
