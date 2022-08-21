import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import LayoutFlex from '../../components/layout-flex';
import './style.css';

function LoginNav() {
	const cn = bem('Login-link');
	const [isAuth, setIsAuth] = useState(false);

	return (
		<>
			{isAuth?
				<LayoutFlex flex="end" padding="10-20" className={cn()}>
					<Link to="/" className={cn('profile')}>User №1</Link>
					<button className={cn('quit')}>Выход</button>
				</LayoutFlex> : 
				<LayoutFlex flex="end" padding="10-20" className={cn()}>
          <Link to="/login" className={cn('login')}><button>Вход</button></Link>
				</LayoutFlex>
			}
		</>
	)
}

export default LoginNav;