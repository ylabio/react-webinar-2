import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

function Comment(props) {
	const cn = bem('Comment');
	const date = new Date(props.comment.date).toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'});
	const time = new Date(props.comment.date).toLocaleString('ru', {hour: 'numeric', minute: 'numeric'});

	return (
		<div className={cn()} style={{paddingLeft: props.comment.level}}>
			<div className={cn('title')}>
				<span>{props.comment.author}</span>
				<span className={cn('date')}>{date} в {time}</span>
			</div>
			<p className={cn('text')}>{props.comment.text}</p>
			<p className={cn('button')} onClick={() => props.show(props.comment.id)}>Ответить</p>
			{props.children}
		</div>
	);
}

Comment.propTypes = {
	comment: propTypes.object,
	show: propTypes.func,
};

Comment.defaultProps = {
	comment: {},
	show: () => {}
};

export default React.memo(Comment);