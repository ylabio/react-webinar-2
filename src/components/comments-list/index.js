import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import CommentsItem from './../comments-item/index';
import 'style.css';

function CommentsList({commentsItems, activeKey, setActiveKey, exists, onSignIn}) {
	const cn = bem('commentsItems');
	
	return (
		<div className={cn()}>
			{commentsItems.map((commentsItem, index) => 
				<CommentsItem key={commentsItem._id} item={commentsItem} activeKey={activeKey} setActiveKey={setActiveKey} exists={exists} onSignIn={onSignIn} itemIndex={index}/>)}
		</div>
	)
}

CommentsList.propTypes = {
	commentsItems: propTypes.arrayOf(propTypes.object).isRequired,
	activeKey: propTypes.string,
	setActiveKey: propTypes.func,
	exists: propTypes.bool.isRequired,
	onSignIn: propTypes.func
}

CommentsItem.defaultProps = {
	activeKey: '',
	setActiveKey: (key) => key,
	onSignIn: () => {}
};

export default React.memo(CommentsList);