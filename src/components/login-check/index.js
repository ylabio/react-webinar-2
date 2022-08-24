import React, {useEffect} from "react";
import PropTypes from "prop-types";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";

function LoginCheck({children}){
	const navigate = useNavigate();
	const profile = useSelector(state => state.profile);
	useEffect(() => {if(!profile.isLogin) navigate("/auth")}, [profile.isLogin])

	return(children)
}

LoginCheck.propTypes = {
	children: PropTypes.node
}

export default React.memo(LoginCheck);