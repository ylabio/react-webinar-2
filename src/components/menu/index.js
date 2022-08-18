import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';

import './style.css';

function Menu({ linkTo }) {
	const cn = bem('Menu');

	return (
		<nav className={cn()}>
			<ul>
				<Link to={linkTo} className={cn('link')}>
					Главная
				</Link>
			</ul>
		</nav>
	);
}

Menu.propTypes = {
	linkTo: propTypes.string.isRequired,
};

export default React.memo(Menu);
