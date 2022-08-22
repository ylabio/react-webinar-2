import React from "react";
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import "style.css";

const LoginHead = (props) => {
	const cn = bem("LoginHead");

	return (
		<div className={cn()}>
		{props.profile.isLogin
			? <>
				<Link to={"/profile"}>
				<div className={cn("name")}>{props.profile.user?.profile?.name}</div>
				</Link>
				<button onClick={props.logout}>Выход</button>
			</>
		: <Link to={"/auth"}><button>Вход</button></Link>}
		</div>
	)
}

LoginHead.propTypes = {
	profile: propTypes.object,
	logout: propTypes.func
}

LoginHead.defaultProps = {
	profile: {},
	logout: () => {}
}

export default React.memo(LoginHead);