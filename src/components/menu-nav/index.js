import React from 'react';
import propTypes from 'prop-types';

import './style.css';

function MenuNav({ left, right }) {
	return (
		<div className="MenuNav">
			{left}
			{right}
		</div>
	);
}

MenuNav.propTypes = {
	left: propTypes.object,
	right: propTypes.object,
};

export default React.memo(MenuNav);
