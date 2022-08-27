import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function CommentsTitle({commentsCount, /*exists*/}) {
	const cn = bem('CommentsTitle');

	return (
		<>
			<div className={cn()}>Комментарии ({commentsCount})</div>
			{/* {!exists && <div>Войдите, чтобы иметь возможность комментировать</div>} */}
		</>
	)
}

CommentsTitle.propTypes = {
  commentsCount: propTypes.number,
	// exists:propTypes.bool.isRequired
}

CommentsTitle.defaultProps = {
  commentsCount: 0
}

export default React.memo(CommentsTitle);