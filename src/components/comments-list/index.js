import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentItem from './comment-item';
import './style.css';
import CommentForm from './comment-form';

function CommentsList({
	comments,
	count,
	deleteComment,
	articleId,
	formId,
	createComment,
}) {
	const cn = bem('CommentsList');

	return (
		<div className={cn()}>
			<h2 className={cn('title')}>Комментарии ({count})</h2>
			{comments.length > 0 && (
				<div className={cn('items')}>
					{comments.map((comment) => (
						<CommentItem
							key={comment._id}
							comment={comment}
							child={comment.parent._tree.length}
							deleteComment={deleteComment}
							articleId={articleId}
						/>
					))}
				</div>
			)}
			{formId === articleId && (
				<CommentForm
					formType='new'
					parentType='article'
					createComment={createComment}
					parentId={articleId}
					articleId={articleId}
				/>
			)}
		</div>
	);
}

CommentsList.propTypes = {
	comments: propTypes.array.isRequired,
	count: propTypes.number.isRequired,
	deleteComment: propTypes.func.isRequired,
	articleId: propTypes.string.isRequired,
	formId: propTypes.string.isRequired,
	createComment: propTypes.func.isRequired,
};

CommentsList.defaultProps = {
	comments: [],
	count: 0,
	deleteComment: () => {},
	createComment: () => {},
};

export default React.memo(CommentsList);
