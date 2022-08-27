import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import '../style.css';
import Textarea from '../../../components/textarea';

function ReplyForm({ onChange, value, openForm, articleId }) {
	const cn = bem('CommentForm');

	function handleOpenForm() {
		openForm(articleId);
	}

	return (
		<>
			<h2 className={cn('title')}>Новый ответ </h2>
			<Textarea name='text' onChange={onChange} value={value} />
			<div className={cn('actions')}>
				<button type='submit'>Отправить</button>
				<button onClick={handleOpenForm}>Отмена</button>
			</div>
		</>
	);
}

ReplyForm.propTypes = {
	onChange: propTypes.func.isRequired,
	value: propTypes.string.isRequired,
	openForm: propTypes.func.isRequired,
	articleId: propTypes.string.isRequired,
};

ReplyForm.defaultProps = {
	onChange: () => {},
	openForm: () => {},
};

export default React.memo(ReplyForm);
