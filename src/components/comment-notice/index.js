import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentNotice({ formType, onSignIn, handleOpenForm }) {
	const cn = bem('CommentNotice');

	return (
		<div className={cn()}>
			{formType === 'new' && (
				<div>
					<span className={cn('login')} onClick={onSignIn}>
						Войдите
					</span>
					, чтобы иметь возможность комментировать
				</div>
			)}
			{formType === 'reply' && (
				<div>
					<span className={cn('login')} onClick={onSignIn}>
						Войдите
					</span>
					, чтобы иметь возможность ответить.{' '}
					<span className={cn('cancel')} onClick={handleOpenForm}>
						Отмена
					</span>
				</div>
			)}
		</div>
	);
}

CommentNotice.propTypes = {
	formType: propTypes.string.isRequired,
	onSignIn: propTypes.func.isRequired,
	handleOpenForm: propTypes.func.isRequired,
};

CommentNotice.defaultProps = {
	onSignIn: () => {},
	handleOpenForm: () => {},
};

export default React.memo(CommentNotice);
