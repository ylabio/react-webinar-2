import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import dateFormat from '../../../utils/date-format';

function CommentItem({ comment, child }) {
	const cn = bem('CommentItem');

	return (
		<div className={cn()} style={{ marginLeft: child > 1 && child * 30 }}>
			<div className={cn('head')}>
				<div className={cn('headUser')}>{comment.author.profile.name}</div>
				<div className={cn('headDate')}>{dateFormat(comment.dateCreate)}</div>
			</div>
			<div className={cn('text')}>{comment.text}</div>
			<button className={cn('reply')}>Ответить</button>
		</div>
	);
}

CommentItem.propTypes = {
	comment: propTypes.object.isRequired,
	child: propTypes.number.isRequired,
};

CommentItem.defaultProps = {};

export default React.memo(CommentItem);
