import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import dateFormat from '../../utils/date-format';
import CommentForm from '../comment-form';
import './style.css';

function CommentItem({
	comment,
	formId,
	child,
	articleId,
	openForm,
	createComment,
}) {
	const cn = bem('CommentItem');

	return (
		<>
			<div
				className={cn()}
				style={{ marginLeft: child >= 1 && child < 6 ? child * 30 : 150 }}
			>
				<div className={cn('body')}>
					<div className={cn('head')}>
						<div className={cn('headUser')}>{comment.author.profile.name}</div>
						<div className={cn('headDate')}>
							{dateFormat(comment.dateCreate)}
						</div>
					</div>
					<div className={cn('text')}>{comment.text}</div>
					<button className={cn('reply')} onClick={() => openForm(comment._id)}>
						Ответить
					</button>
				</div>
				{formId === comment._id && (
					<CommentForm
						formType='reply'
						parentType='comment'
						createComment={createComment}
						parentId={comment._id}
						articleId={articleId}
						openForm={openForm}
					/>
				)}
			</div>
		</>
	);
}

CommentItem.propTypes = {
	comment: propTypes.object.isRequired,
	formId: propTypes.string.isRequired,
	child: propTypes.number.isRequired,
	articleId: propTypes.string.isRequired,
	openForm: propTypes.func.isRequired,
	createComment: propTypes.func.isRequired,
};

CommentItem.defaultProps = {
	openForm: () => {},
	createComment: () => {},
};

export default React.memo(CommentItem);
