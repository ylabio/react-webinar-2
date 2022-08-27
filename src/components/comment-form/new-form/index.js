import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import '../style.css';
import Textarea from '../../../components/textarea';

function NewForm({ onChange, value }) {
	const cn = bem('CommentForm');

	return (
		<>
			<h2 className={cn('title')}>Новый комментарий</h2>
			<Textarea name='text' onChange={onChange} value={value} />
			<div className={cn('actions')}>
				<button type='submit'>Отправить</button>
			</div>
		</>
	);
}

NewForm.propTypes = {
	onChange: propTypes.func.isRequired,
	value: propTypes.string.isRequired,
};

NewForm.defaultProps = {
	onChange: () => {},
};

export default React.memo(NewForm);
