//Core
import React from 'react';
import ReactDOM from 'react-dom';

//3rd party libraries
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

//Local
import './style.css';

/*
 * Диалоговое окно
 * @param isModalOpen {boolean} индекс открытости
 * @param children {React.ReactElement} основной контент диалогового окна
 * @return {React.ReactElement} Виртуальные элементы React
 */
function ModalLayout({ header, isModalOpen, children }) {
	const cn = bem('Modal');
	return ReactDOM.createPortal(
		<div className={cn({ opened: isModalOpen })}>
			<div className={cn('container')}>
				<div className={cn('head')}>{header}</div>
				<div className={cn('content')}>{children}</div>
			</div>
		</div>,
		document.querySelector('#modal'),
	);
}

ModalLayout.propTypes = {
	header: propTypes.element,
	children: propTypes.element,
	isModalOpen: propTypes.bool.isRequired,
};

ModalLayout.defaultProps = {
	isModalOpen: false,
};

export default React.memo(ModalLayout);
