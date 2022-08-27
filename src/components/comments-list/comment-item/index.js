import React, { useCallback } from 'react';
import {
	useStore as useStoreRedux,
	useSelector as useSelectorRedux,
	shallowEqual,
} from 'react-redux';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import dateFormat from '../../../utils/date-format';
import actionsComments from '../../../store-redux/comments/actions';
import CommentForm from '../comment-form';

function CommentItem({ comment, child, deleteComment, articleId }) {
	const cn = bem('CommentItem');

	function handleDelete(_id) {
		deleteComment(comment._id);
	}

	const storeRedux = useStoreRedux();

	const select = useSelectorRedux(
		(state) => ({
			formId: state.comments.formId,
		}),
		shallowEqual,
	);

	const callbacks = {
		createComment: useCallback(
			(text, parentId, type, articleId) =>
				storeRedux.dispatch(
					actionsComments.createComment(text, parentId, type, articleId),
				),
			[],
		),
		openForm: useCallback(
			(id) => storeRedux.dispatch(actionsComments.openForm(id)),
			[],
		),
	};

	return (
		<>
			<div className={cn()} style={{ marginLeft: child > 1 && child * 30 }}>
				<div className={cn('head')}>
					<div className={cn('headUser')}>{comment.author.profile.name}</div>
					<div className={cn('headDate')}>{dateFormat(comment.dateCreate)}</div>
					<button onClick={handleDelete}>Удалить</button>
				</div>
				<div className={cn('text')}>{comment.text}</div>
				<button
					className={cn('reply')}
					onClick={() => callbacks.openForm(comment._id)}
				>
					Ответить
				</button>
			</div>
			{select.formId === comment._id && (
				<CommentForm
					formType='reply'
					parentType='comment'
					style={{ marginLeft: child > 1 && child * 30 }}
					createComment={callbacks.createComment}
					parentId={comment._id}
					articleId={articleId}
					openForm={callbacks.openForm}
				/>
			)}
		</>
	);
}

CommentItem.propTypes = {
	comment: propTypes.object.isRequired,
	child: propTypes.number.isRequired,
	deleteComment: propTypes.func.isRequired,
	articleId: propTypes.string.isRequired,
};

CommentItem.defaultProps = {
	deleteComment: () => {},
};

export default React.memo(CommentItem);
