import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function Page({ onClick, children, isActive }) {
	const cn = bem('Page');

	return (
		<div className={cn(isActive && { active: true })} onClick={onClick}>
			{children}
		</div>
	);
}

Page.propTypes = {
	onClick: propTypes.func.isRequired,
	children: propTypes.node.isRequired,
	isActive: propTypes.bool,
};

Page.defaultProps = {
	onClick: () => {},
	isActive: false,
};

export default React.memo(Page);
