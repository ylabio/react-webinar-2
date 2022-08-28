import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';

function CommentsForm(props) {
	const [message, setMessage] = React.useState('');
	const params = useParams();
	const cn = bem('CommentsForm');

	const data = {
		text: message,
		parent: {
			_id: props.id,
			_type: props.type,
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (!message) return;
		props.post(data, params.id, props.id);
		setMessage('');
	};

	return (
		<div className={cn() + ' ' + cn(!props.show ? 'hide' : 'show')}>
			<form onSubmit={onSubmit} className={cn()}>
				<label>
					<p className={cn('title')}>{props.title}</p>
					<textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
				</label>
				<div className={cn('buttons')}>
					<input type="submit" value="Отправить"/>
					<input type="button" value="Отменить" onClick={props.hide}/>
				</div>
			</form>
		</div>
	);
}

CommentsForm.propTypes = {
	id: propTypes.string,
	type: propTypes.string,
	post: propTypes.func,
	label: propTypes.string,
	show: propTypes.bool,
	hide: propTypes.func,
	children: propTypes.node,
};

CommentsForm.defaultProps = {
	id: "",
	type: "",
	post: () => {},
	label: "",
	show: false,
	hide: () => {},
	children: <div/>,
};

export default React.memo(CommentsForm);