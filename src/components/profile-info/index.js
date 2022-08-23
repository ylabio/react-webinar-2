import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileInfo({ user }) {
	const cn = bem('ProfileInfo');

	return (
		<div className={cn()}>
			<h2 className={cn('title')}>Профиль</h2>
			{user && (
				<ul className={cn('list')}>
					<li>
						Имя:<span>{user.profile.name}</span>
					</li>
					<li>
						Телефон:<span>{user.profile.phone}</span>
					</li>
					<li>
						email:<span>{user.email}</span>
					</li>
				</ul>
			)}
		</div>
	);
}

ProfileInfo.propTypes = {
	user: propTypes.object,
};

ProfileInfo.defaultProps = {};

export default React.memo(ProfileInfo);
