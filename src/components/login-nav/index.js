import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import LayoutFlex from '../../components/layout-flex';
import './style.css';

function LoginNav(props) {
	const cn = bem('Login-link');

	const callbacks = {
    onAuthorization: useCallback(() => props.onLogout(), [])
	}
	
	return (
		<>
			{props.isAuth?
				<LayoutFlex flex="end" padding="10-20" className={cn()}>
					<Link to="/profile" className={cn('profile')}>{props.user.name}</Link>
					<button className={cn('quit')} onClick={callbacks.onAuthorization}>{props.t("header.logOut")}</button>
				</LayoutFlex> : 
				<LayoutFlex flex="end" padding="10-20" className={cn()}>
          <Link to="/login" className={cn('login')}><button>{props.t("header.logIn")}</button></Link>
				</LayoutFlex>
			}
		</>
	)
}

LoginNav.propTypes = {
  isAuth: propTypes.bool,
	user: propTypes.object.isRequired,
	onLogout: propTypes.func,
	t: propTypes.func
}

LoginNav.defaultProps = {
	isAuth: false,
	onLogout: () => {},
	t: (text) => text
}

export default React.memo(LoginNav);