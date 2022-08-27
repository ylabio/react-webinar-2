import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import NewForm from './new-form';
import ReplyForm from './reply-form';
import ProtectedComment from '../../../containers/protected-comment';

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

	const callbacks = {
		onChange: useCallback((value) => {
			setText(value);
		}, []),

		onSubmit: useCallback(
			(e) => {
				e.preventDefault();
				createComment(text, parentId, parentType, articleId);
				setText('');
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
					<NewForm onChange={callbacks.onChange} value={text} />
				)}
				{formType === 'reply' && (
					<ReplyForm
						onChange={callbacks.onChange}
						value={text}
						openForm={openForm}
						articleId={articleId}
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
