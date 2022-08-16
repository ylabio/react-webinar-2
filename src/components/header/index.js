import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Navbar from '../navbar';
import BasketSimple from '../basket-simple';

function Header({ language, onOpen, amount, sum }) {
	const cn = bem('Header');

	return (
		<header className={cn()}>
			<div className={cn('body')}>
				<Navbar language={language} />
				<BasketSimple
					onOpen={onOpen}
					amount={amount}
					sum={sum}
					language={language}
				/>
			</div>
		</header>
	);
}

Header.propTypes = {
	language: propTypes.string.isRequired,
	onOpen: propTypes.func.isRequired,
};

Header.defaultProps = {
	onOpen: () => {},
};

export default React.memo(Header);
