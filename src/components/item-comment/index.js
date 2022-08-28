import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CommentForm from "../comment-form";
import propTypes from "prop-types";

function ItemComment(props) {
  const cn = bem('ItemComment');
  
  // Приведение к нужному формату даты для отоборажения в комментариях
  const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  
  const date = new Date(props.date)
  
  const commentDate = `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} в ${date.getHours()}:${date.getMinutes()}`

  return (
    <div className={cn()} style={{"paddingLeft": (props.nestingLevel - 1) * 30}}>
      <div className={cn('header')}>
        <span className={cn('title')}>{props.title}</span><span className={cn('date')}>{commentDate}</span>
      </div>
      <div className={cn('text')}>{props.text}</div>
      <span className={cn('answerLink')} onClick={() => props.changeCurrentForm(props.id)}>Ответить</span>
      {props.currentAnswer === props.id &&
        <CommentForm
          currentAnswer={props.currentAnswer}
          resetCurrentForm={props.resetCurrentForm}
          postNewComment={props.postNewComment}
          redirect={props.redirect}
          sessionExists={props.sessionExists}
        />}
    </div>
  )
}

ItemComment.propTypes = {
  date: propTypes.string,
  nestingLevel: propTypes.number,
  title: propTypes.string,
  text: propTypes.string,
  changeCurrentForm: propTypes.func,
  id: propTypes.string,
  currentAnswer: propTypes.string,
  redirect: propTypes.func,
  sessionExists: propTypes.bool,
  postNewComment: propTypes.func
}

ItemComment.defaultProps = {
  changeCurrentForm: () => {
  },
  redirect: () => {
  },
  resetCurrentForm: () => {
  },
  postNewComment: () => {
  },
}

export default React.memo(ItemComment);
