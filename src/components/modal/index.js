import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal(props) {
	const cn = bem('Modal');

	const keydownHandler = ({ key }) => {
		switch (key) {
			case 'Escape':
				props.toggleModal();
				break;
			default:
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', keydownHandler);
		return () => document.removeEventListener('keydown', keydownHandler);
	});

	return (
		<div className={cn()} onClick={props.toggleModal}>
			<div className={cn('body')} onClick={(e) => e.stopPropagation()}>
				<div className={cn('bodyHead')}>
					<h1>{props.title}</h1>
					<button onClick={props.toggleModal}>Закрыть</button>
				</div>
				<div className={cn('bodyContent')}>{props.children}</div>
			</div>
		</div>
	);
}

Modal.propTypes = {
	title: propTypes.string.isRequired,
	children: propTypes.node,
	toggleModal: propTypes.func.isRequired,
};

Modal.defaultProps = {
	toggleModal: () => {},
};

export default React.memo(Modal);
