import React from "react";
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import "./style.css"

const ProfileInfo = (props) => {
	const cn = bem("ProfileInfo");

	return (
		<div className={cn()}>
			<div className={cn("header")}>Профиль</div>

			<div className={cn("text")}>
				Имя: <span>{props.profile?.user?.profile ? props.profile.user.profile.name : ""}</span>
			</div>

			<div className={cn("text")}>
				Телефон: <span>+70000000001</span>
			</div>

			<div className={cn("text")}>
				email: <span>test_50@example.com</span>
			</div>
		</div>
	)
}

ProfileInfo.propTypes = {
	profile: propTypes.object
}

ProfileInfo.defaultProps = {
	profile: {}
}

export default React.memo(ProfileInfo);