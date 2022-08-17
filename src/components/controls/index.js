import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom';
import Nav from '../nav';
import './style.css';

const NavItems = [
	{title: 'Главная', pathLink: '/'}
];

function Controls({children}){
	const cn = bem('Controls');

  return (
    <div className={cn()}>
			<Nav NavItems={NavItems} />

			{children}
    </div>
  )
}

Controls.propTypes = {
}

Controls.defaultProps = {
}

export default React.memo(Controls);
