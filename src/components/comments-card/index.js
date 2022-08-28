import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function CommentsCard({ children }) {
	const cn = bem('CommentsCard');
	return <div className={cn()}>{children}</div>;
}

CommentsCard.propTypes = {
	children: propTypes.node,
};

CommentsCard.defaultProps = {
	children: <div/>
};

export default React.memo(CommentsCard);