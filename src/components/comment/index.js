import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import dateFormat from './../../utils/date-format';
import CommentFild from '../comment-fild';
import propTypes from 'prop-types';

function Comment(props) {
  const cn = bem('Comment');

  const callbacks = {
    answer: useCallback((e) => {
      props.changeParentId(props.item._id)
      props.changePlace('comment')
    }, [props.item._id])
  };


function Otstup(){
  let level= props.item.level;
  let indent=[];
  for(let i=0;i<level;i++) {indent.push(<div key={i} className={cn('indent')}></div>)};
  return indent
  }
  return (
    <div className={cn()}>
      <div className={cn('Otstup')}><Otstup/></div>
      <div className={cn('body')}>
      <div className={cn('head')}> <span className={cn('user')}>{props.item.author}</span>
         <span className={cn('data')}>
         {dateFormat(props.item.dateCreate, {year: "numeric",month: "long",day: "numeric"}).slice(0,-3)}{' в '}
         {dateFormat(props.item.dateCreate, {hour: "numeric", minute: "numeric",})}
         </span>
      </div>
     <div className={cn('text')}> {props.item.text}</div>
      <button className={cn('answer')} onClick={callbacks.answer}>Ответить</button>

     {props.place==='comment'&&props.parentId===props.item._id&& <CommentFild 
      text={props.text} 
      cancelComment={props.cancelComment}
      sendComment={props.sendComment}
      place={props.place}
      changeText={props.changeText}
      exists={props.exists}
      link={props.link}
      placeholder={props.placeholder}
      />}
      </div>
    </div>
  )
}
Comment.propTypes = {
  text: propTypes.string,
  place: propTypes.string,
  cancelComment: propTypes.func,
  sendComment: propTypes.func,
  changeText: propTypes.func,
  link: propTypes.func,
  exists: propTypes.bool,
  placeholder: propTypes.string
}

export default React.memo(Comment);
