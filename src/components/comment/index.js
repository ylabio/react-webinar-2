import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CommentForm from "../comment-form";
import propTypes from "prop-types";

function Comment(props) {
  const cn = bem('Comment');
  const month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

  // Приведение к нужному формату даты для отоборажения в комментариях
  const date = new Date(props.item.date)



  return (
    <div className={cn()} style={{"paddingLeft": (props.item.nestingLevel) * 30}}>
      <div className={cn('header')}>
        <span className={cn('title')}>{props.item.author}</span>
        <span className={cn('date')}>
          {`${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} в ${date.getHours()}:${date.getMinutes()}`}
        </span>
      </div>
      <div className={cn('label')}>{props.item.text}</div>
      <span className={cn('answerLink')} onClick={() => props.changePlace(props.item.id)}>Ответить</span>
      {props.children}
    </div>
  )
}

Comment.propTypes = {
  item: propTypes.object,
  changePlace: propTypes.func,
  current: propTypes.string,
  redirect: propTypes.func,
  sessionExists: propTypes.bool,
  createComment: propTypes.func,
  resetPlace: propTypes.func,
  children: propTypes.node

}

Comment.defaultProps = {
}

export default React.memo(Comment);