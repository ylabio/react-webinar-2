import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import NewForm from './new-form';
import ReplyForm from './reply-form';
import ProtectedComment from '../../containers/protected-comment';

function CommentForm({
	createComment,
	parentId,
	articleId,
	parentType,
	openForm,
	formType,
}) {
	const cn = bem('CommentForm');

	const [text, setText] = useState('');
	const [error, setError] = useState(false);

	const callbacks = {
		onChange: useCallback((value) => {
			setText(value);
		}, []),

		onSubmit: useCallback(
			(e) => {
				e.preventDefault();
				if (text.trim().length > 0) {
					createComment(text, parentId, parentType, articleId);
					setText('');
					setError(false)
				} else {
					setText('');
					setError(true)
				}
			},
			[text],
		),
	};

	return (
		<ProtectedComment
			formType={formType}
			openForm={openForm}
			articleId={articleId}
		>
			<form className={cn()} onSubmit={callbacks.onSubmit}>
				{formType === 'new' && (
					<NewForm onChange={callbacks.onChange} value={text} error={error} />
				)}
				{formType === 'reply' && (
					<ReplyForm
						onChange={callbacks.onChange}
						value={text}
						openForm={openForm}
						articleId={articleId}
						error={error}
					/>
				)}
			</form>
		</ProtectedComment>
	);
}

CommentForm.propTypes = {
	createComment: propTypes.func.isRequired,
	parentId: propTypes.string.isRequired,
	articleId: propTypes.string.isRequired,
	parentType: propTypes.string.isRequired,
	openForm: propTypes.func.isRequired,
	formType: propTypes.string.isRequired,
};

CommentForm.defaultProps = {
	createComment: () => {},
	openForm: () => {},
};

export default React.memo(CommentForm);
