import React, { useState } from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import { useDispatch } from 'react-redux';
import actionsComments from '../../store-redux/comments/actions';
import './style.css';

function CommentsForm({_id, activeKey, setActiveKey, _type, lvl, author, itemIndex}) {
	const cn = bem('CommentsForm');
	const dispatch = useDispatch();
	const initial = activeKey === 'main' ? 'Текст' : `Мой ответ для ${author.username}`;
	const [commentText, setCommentText] = useState(initial);
	
	const sendComment = (e) => {
		e.preventDefault();
		if(commentText && commentText.trim() != '' && commentText !== initial) {
			dispatch(actionsComments.newComment(_id, commentText, _type, lvl, author, itemIndex));
			dispatch(actionsComments.setActiveKey('main'));
			setCommentText('Текст');
		}
	};

	return (
		<form className={cn()}>
			<div className={cn('title')}>Новый {activeKey === 'main' ? 'комментарий' : 'ответ'}</div>
			<textarea value={commentText} className={cn('textarea')} onChange={(e) => setCommentText(e.target.value)} onFocus={() => setCommentText('')}></textarea>
			<button className={cn('button')} onClick={sendComment}>Отправить</button>
			{activeKey !== 'main' && <button className={cn('cancel')} onClick={(e) => {
				e.preventDefault();
				setActiveKey('main');
			}}>Отмена</button>}
		</form>
	)
}

CommentsForm.propTypes = {
	_id: propTypes.string,
	activeKey: propTypes.string,
	setActiveKey: propTypes.func,
	_type: propTypes.string.isRequired,
	lvl: propTypes.number.isRequired,
	// author: propTypes.object.isRequired
}

CommentsForm.defaultProps = {
	_id: '',
	activeKey: '',
	setActiveKey: (key) => key
}

export default CommentsForm;