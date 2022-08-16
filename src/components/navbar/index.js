import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';
import { localize } from '../../utils/localize';

function Navbar({ language }) {
	const cn = bem('Navbar');

	const menu = [{ title: localize['Главная'][language], link: '/' }];

	return (
		<nav className={cn()}>
			<ul className={cn('list')}>
				{menu.map((item) => (
					<li className={cn('listItem')} key={item.title}>
						<Link to={item.link}>{item.title}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

Navbar.propTypes = {
	language: propTypes.string.isRequired,
};

Navbar.defaultProps = {};

export default React.memo(Navbar);
