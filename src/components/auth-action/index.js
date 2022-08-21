import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function AuthAction({ isAuth, user, onLogout }) {
	const cn = bem('AuthAction');
	return (
		<div className={cn()}>
			{isAuth ? (
				<>
					<Link className={cn('profile')} to='/profile'>
						{user.profile.name}
					</Link>
					<button onClick={onLogout}>Выход</button>
				</>
			) : (
				<Link to='/login'>
					<button>Вход</button>
				</Link>
			)}
		</div>
	);
}

AuthAction.propTypes = {
	isAuth: propTypes.bool.isRequired,
	user: propTypes.object,
	onLogout: propTypes.func,
};

AuthAction.defaultProps = {
	isAuth: false,
	onLogout: () => {},
};

export default React.memo(AuthAction);
