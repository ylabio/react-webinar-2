import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';

function PageMessage(props) {
	const cn = bem('PageMessage');

	return (
		<div className={cn()}>
			<h2 className={cn('message')}>{props.children}</h2>
		</div>
	);
}

PageMessage.propTypes = {
	children: propTypes.node,
};

export default React.memo(PageMessage);
