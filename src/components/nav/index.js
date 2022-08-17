import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom';
import './styles.css';

function Nav(props) {
	const cn = bem('Nav');

	return (
		<div className={cn()}>
			{props.NavItems.map(navItem => (
				<div className={cn('link')}>
					<Link to={navItem.pathLink}>{navItem.title}</Link>
				</div>
			))}
		</div>
	)
}

Nav.propTypes = {
  NavItems: propTypes.arrayOf(propTypes.object).isRequired
}

Nav.defaultProps = {
}

export default React.memo(Nav);