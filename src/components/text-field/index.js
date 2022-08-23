import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function TextField(props) {
	const cn = bem('TextField');

	return (
		<div className={cn()}>
			<label htmlFor={props.name}>{props.label}</label>
			<input
        id={props.id}
				type={props.type}
				value={props.value}
				name={props.name}
				placeholder={props.placeholder}
				onChange={props.onChange}
			/>
		</div>
	);
}

TextField.propTypes = {
	id: propTypes.string,
	label: propTypes.string,
	name: propTypes.string,
	value: propTypes.string,
	type: propTypes.string,
	onChange: propTypes.func,
	placeholder: propTypes.string,
};

TextField.defaultProps = {
	label: '',
	name: '',
	type: 'text',
	onChange: () => {},
};

export default React.memo(TextField);
