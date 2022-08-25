import React from "react";
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import "style.css";

const LoginHead = (props) => {
	const cn = bem("LoginHead");

	return (
		<div className={cn()}>
		{props.auth?.isLogin
			? <>
				<Link to={"/profile"}>
				<div className={cn("name")}>{props.auth.name}</div>
				</Link>
				<button onClick={props.signout}>Выход</button>
			</>
		: <Link to={"/auth"}><button>Вход</button></Link>}
		</div>
	)
}

LoginHead.propTypes = {
	auth: propTypes.object,
	signout: propTypes.func
}

LoginHead.defaultProps = {
	auth: {},
	signout: () => {}
}

export default React.memo(LoginHead);