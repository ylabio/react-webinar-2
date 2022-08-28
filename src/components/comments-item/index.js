import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import transformData from './../../utils/transformDate';
import 'style.css';

function CommentsItem({item}) {
	const cn = bem('CommentsItem');
	
	return (
		<div className={cn()} style={{marginLeft: `${item.lvl * 30}px`}}>
			<div className={cn('header')}>
				<span className={cn('author')}>{item.author.username}</span>
				<span className={cn('date')}>{transformData(item.dateCreate)}</span>
			</div>
			<div className={cn('text')}>{item.text}</div>
			<button className={cn('button')}>Ответить</button>
		</div>
	)
}

CommentsItem.propTypes = {
	item: propTypes.object.isRequired,
}

CommentsItem.defaultProps = {
};

export default CommentsItem;