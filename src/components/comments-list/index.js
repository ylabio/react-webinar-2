import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import CommentsItem from './../comments-item/index';
import 'style.css';

function CommentsList({commentsItems}) {
	const cn = bem('commentsItems');
	
	return (
		<div className={cn()}>
			{commentsItems.map(commentsItem => <CommentsItem key={commentsItem._id} item={commentsItem}/>)}
		</div>
	)
}

CommentsList.propTypes = {
	commentsItems: propTypes.arrayOf(propTypes.object).isRequired
}

CommentsItem.defaultProps = {
};

export default React.memo(CommentsList);