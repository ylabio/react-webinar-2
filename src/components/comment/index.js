import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './styles.css'

const Comment = (props) => {
  const cn = bem("Comment")
  
  return (
    <div className={cn()} style={{ paddingLeft: props.level * 35 }}>
      <div className={cn("title")}>
        <p className={cn(props.me ? "user-me" : "user")}>{props.userName}</p>
        <p className={cn("date")}>{props.date}</p>
      </div>
      <div className={cn("wrap")}>
        <p className={cn("text")}>{props.text}</p>
      </div>
      <button className={cn("reply")} onClick={props.onReply}>
        {props.title}
      </button>
      {props.replyComponent}
    </div>
  );
};

Comment.propTypes = {
  userName: propTypes.string,
  date: propTypes.string,
  text: propTypes.string,
  title: propTypes.string,
  me: propTypes.bool,
  onReply: propTypes.func,
  replyComponent: propTypes.node,
  level: propTypes.number,
};

Comment.defaultProps = {
  userName: "",
  date: "",
  text: "",
  title: "Ответить",
  me: false,
  level: 1,
  onReply: () => {},
};

export default React.memo(Comment);