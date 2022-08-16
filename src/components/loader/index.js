import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function Loader() {
	const cn = bem('Loader');

	return (
		<div className={cn()}>
			<div className={cn('item')}></div>
			<div className={cn('item')}></div>
			<div className={cn('item')}></div>
		</div>
	)
}

export default Loader;