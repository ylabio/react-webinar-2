import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

function CommentLogin(props) {
	const cn = bem('CommentLogin');
	return (
		<div className={cn()}>
      <span className={cn('login')} onClick={props.login}>Войдите</span>
			<span>, чтобы иметь возможность комментировать. </span>
			<span className={cn('hide')} onClick={props.hide}>Отмена</span>
		</div>
	);
}

CommentLogin.propTypes = {
	login: propTypes.func,
	hide: propTypes.func,
};

CommentLogin.defaultProps = {
	login: () => {},
	hide: () => {}
};

export default React.memo(CommentLogin);