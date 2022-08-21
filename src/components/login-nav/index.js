import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import LayoutFlex from '../../components/layout-flex';
import './style.css';

function LoginNav(props) {
	const cn = bem('Login-link');
	
	return (
		<>
			{props.isAuth?
				<LayoutFlex flex="end" padding="10-20" className={cn()}>
					<Link to="/profile" className={cn('profile')}>{props.user.name}</Link>
					<button className={cn('quit')}>Выход</button>
				</LayoutFlex> : 
				<LayoutFlex flex="end" padding="10-20" className={cn()}>
          <Link to="/login" className={cn('login')}><button>Вход</button></Link>
				</LayoutFlex>
			}
		</>
	)
}

LoginNav.propTypes = {
  isAuth: propTypes.bool,
	user: propTypes.object.isRequired,
}

LoginNav.defaultProps = {
	isAuth: false
}

export default React.memo(LoginNav);