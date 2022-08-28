import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import 'style.css';

function CommentsLogin({title, onSignIn, activeKey, setActiveKey}) {
	const cn = bem('CommentsLogin');

	return (
		<div className={cn()}>
			<button className={cn('button')} onClick={onSignIn}>Войдите</button>, {title}
			{activeKey !== 'main' && 
				<button className={cn('cancel')} onClick={() => setActiveKey('main')}>Отмена</button>}
		</div>
	)
}

CommentsLogin.propTypes = {
	title: propTypes.string,
	onSignIn: propTypes.func,
	activeKey: propTypes.string,
	setActiveKey: propTypes.func
}

CommentsLogin.defaultProps = {
	title: '',
	onSignIn: () => {},
	activeKey: '',
	setActiveKey: (key) => key
}

export default React.memo(CommentsLogin);