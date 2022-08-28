import React from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function Comment({comment_id, userName, date, text, depthLevel, activeComment, setActiveComment, replyComponent}) {
  const cn = bem("Comment");

  return (
    <div className={cn()} style={{paddingLeft: depthLevel*35}}>
      <div className={cn('title')}>
        <span className={cn('userName')}>{userName}</span>
        <span className={cn('date')}>{date}</span>
      </div>
      <div className={cn('text')}>
        {text}
      </div>
      <span className={cn('reply')} onClick={setActiveComment}>
        Ответить
      </span>
      {activeComment === comment_id && 
      <div className={cn('reply-form')}>
        {replyComponent}
      </div>}
    </div>
  )
}

Comment.propTypes = {
  comment_id: propTypes.string.isRequired,
  userName: propTypes.string,
  date: propTypes.string,
  text: propTypes.string,
  depthLevel: propTypes.number,
  activeComment: propTypes.string.isRequired,
  setActiveComment: propTypes.func,
  replyComponent: propTypes.object
}

Comment.defaultProps = {
  userName: 'Имя пользователя',
  date: 'Дата',
  text: 'Текст',
  depthLevel: 0,
  setActiveComment: () => {},
  replyComponent: <div>reply-form</div>
}

export default React.memo(Comment);
