import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import transformData from './../../utils/transformDate';
import 'style.css';
import CommentsForm from '../comments-form';
import CommentsLogin from '../comments-login';

function CommentsItem({item, activeKey, setActiveKey, exists, onSignIn, itemIndex}) {
	const cn = bem('CommentsItem');

	const callbacks = {
		setActiveKey: useCallback(() => setActiveKey(item._id), [setActiveKey, item])
	};
	
	return (
		<div className={cn()} style={{marginLeft: `${item.lvl * 30}px`}}>
			<div className={cn('header')}>
				<span className={cn('author')}>{item.author.username}</span>
				<span className={cn('date')}>{transformData(item.dateCreate)}</span>
			</div>
			<div className={cn('text')}>{item.text}</div>
			<button className={cn('button')} onClick={callbacks.setActiveKey}>Ответить</button>

			{activeKey === item._id && exists && 
				<CommentsForm _id={item._id} activeKey={activeKey} setActiveKey={setActiveKey} _type="comment" lvl={item.lvl + 1} author={item.author} itemIndex={itemIndex}/>}
			{activeKey === item._id && !exists && 
				<CommentsLogin title="чтобы иметь возможность ответить. " onSignIn={onSignIn} activeKey={activeKey} setActiveKey={setActiveKey}/>}
		</div>
	)
}

CommentsItem.propTypes = {
	item: propTypes.object.isRequired,
	activeKey: propTypes.string,
	setActiveKey: propTypes.func,
	exists: propTypes.bool.isRequired
}

CommentsItem.defaultProps = {
	activeKey: '',
	setActiveKey: (key) => key
};

export default CommentsItem;