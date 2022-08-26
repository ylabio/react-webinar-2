import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './styles.css'

const Comment = (props) => {
  const cn = bem("Comment")
  const userBem = props.owner ? ' owner' : ''
  return (
    <div className={cn()} style={{paddingLeft: props.indentLevel*35}}>
      <div className={cn('title')}>
        <p className={cn('user' + userBem)}>{props.author}</p>
        <p className={cn('date')}>{props.dateTime}</p>
      </div>
      <div className={cn('main')}>
        <p className={cn('text')}>{props.text}</p>
      </div>
      <button className={cn('reply')} onClick={props.replyCallback}>{props.replyTitle}</button>
      {props.replyComponent}
    </div>
  );
};

Comment.propTypes = {
  author: propTypes.string,
  dateTime: propTypes.string,
  text: propTypes.string,
  replyTitle: propTypes.string,
  owner: propTypes.bool,
  replyCallback: propTypes.func,
  replyComponent: propTypes.node,
  indentLevel: propTypes.number
}

Comment.defaultProps = {
  author: "",
  dateTime: "",
  text: "",
  replyTitle: "Ответить",
  owner: false,
  indentLevel: 1,
  replyCallback: () => {}
}

export default React.memo(Comment);