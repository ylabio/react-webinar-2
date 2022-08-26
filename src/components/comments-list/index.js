import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentItem from './comment-item';
import './style.css';

function CommentsList({ comments, count }) {
	const cn = bem('CommentsList');

	return (
		<div className={cn()}>
			<h2 className={cn('title')}>Комментарии ({count})</h2>
			<div className={cn('items')}>
				{comments &&
					comments.map((comment) => (
						<CommentItem
							key={comment._id}
							comment={comment}
							child={comment.parent._tree.length}
						/>
					))}
			</div>
		</div>
	);
}

CommentsList.propTypes = {
	comments: propTypes.array.isRequired,
	count: propTypes.number.isRequired,
};

CommentsList.defaultProps = {
	comments: [],
	count: 0,
};

export default React.memo(CommentsList);
