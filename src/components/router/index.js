import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function Router({to, children}) {

	return (
		<Link to={to}>
			{children}
		</Link>
	);
}

Router.propTypes = {
	to: propTypes.string.isRequired,
};

export default Router;