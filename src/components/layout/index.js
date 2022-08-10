//Core
import React from 'react';

//3rd party libraries
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';

//Local
import './style.css';

/**
 * Основной layout для всего приложения
 * @param head {React.ReactElement} заголовок
 * @param children {React.ReactElement} основной контент приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Layout({ head, children }) {
	const cn = bem('Layout');

	return (
		<div className={cn()}>
			<div className={cn('head')}>{head}</div>
			<div className={cn('content')}>{children}</div>
		</div>
	);
}

Layout.propTypes = {
	head: propTypes.node,
	children: propTypes.node,
};

Layout.defaultProps = {};

export default React.memo(Layout);
