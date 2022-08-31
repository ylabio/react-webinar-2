import React, { useCallback, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';
import './style.css';

function Textarea(props) {
	const cn = bem('Textarea');

	const [value, change] = useState(props.value);

	const changeThrottle = useCallback(
		debounce((value) => props.onChange(value, props.name), 0),
		[props.onChange, props.name],
	);

	const onChange = useCallback(
		(event) => {
			change(event.target.value);
			changeThrottle(event.target.value);
		},
		[change, changeThrottle],
	);

	useEffect(() => {
		change(props.value);
	}, [props.value]);

	return (
		<textarea
			className={cn()}
			name={props.name}
			value={value}
			onChange={onChange}
		/>
	);
}

Textarea.propTypes = {
	value: propTypes.string,
	name: propTypes.string,
	onChange: propTypes.func,
};

Textarea.defaultProps = {
	onChange: () => {},
};

export default React.memo(Textarea);
