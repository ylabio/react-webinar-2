import React from "react";
import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";

function LoginCheck({auth = {}, children}){
	return auth.isLogin ? children : <Navigate to={"/auth"}/>
}

LoginCheck.propTypes = {
	auth: PropTypes.object,
	children: PropTypes.node
}

LoginCheck.defaultProps = {
	auth: {},
	children: PropTypes.node
}

export default React.memo(LoginCheck);