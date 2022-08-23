import React from 'react';
import ProfileInfo from '../../components/profile-info';
import useSelector from '../../hooks/use-selector';

function ProfileCard() {
	const { user } = useSelector((state) => ({
		user: state.user.user,
	}));

	return <ProfileInfo user={user} />;
}

export default React.memo(ProfileCard);
