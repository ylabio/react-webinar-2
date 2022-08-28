import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function CommentItem(props) {
  const cn = bem('CommentItem');
console.log("item")
  const onClick = () => {
    props.setItemFooter(props.comment._id);
    props.setListFooter(false);
  };

  return (
    <div style={{marginLeft: `${props.comment.level * 30}px`}} className={cn()}>
      <div className={cn('header')}>
        <span>{props.comment.author.profile.name}</span>
        <span>
          {new Date(props.comment.dateCreate).toLocaleString("ru", {day: 'numeric', month: 'long', year: 'numeric'}).slice(0, -3)}&nbsp;
        </span>
        <span>
          в&nbsp;{new Date(props.comment.dateCreate).toLocaleString("ru", {hour: 'numeric', minute: 'numeric'})}
        </span>
      </div>
      <div className={cn('text')}>
        <pre>{props.comment.text}</pre>  
      </div>
      <span className={cn('response')} onClick={onClick}>
        Ответить
      </span>
      {props.children}
    </div>
  )
}

CommentItem.propTypes = {
  comment: propTypes.object,
  setItemFooter: propTypes.func.isRequired,
  setListFooter: propTypes.func.isRequired,
  children: propTypes.node.isRequired
}

export default React.memo(CommentItem);