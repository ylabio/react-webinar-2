import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import 'style.css';

function CommentsLogin({title, exists, onSignIn}) {
	const cn = bem('CommentsLogin');

	return (
		<>
			{/* {!exists && <div><Link to="/login">Войдите</Link>, {title}</div>} */}
			{!exists && <div className={cn()}><button className={cn('button')} onClick={onSignIn}>Войдите</button>, {title}</div>}
		</>
	)
}

CommentsLogin.propTypes = {
	title: propTypes.string,
	exists: propTypes.bool.isRequired
}

CommentsLogin.defaultProps = {
	title: ''
}

export default React.memo(CommentsLogin);