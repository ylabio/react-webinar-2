import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import TextButton from '../../buttons/text-button';
import CommentAnswerBlock from '../comments-answer-block';

function Comment({item, children, onAnswer, setCommState, commState, className, onAdd, onChange}) {
  // CSS классы по БЭМ
  const cn = bem('Comment');

  return (
    <>
      <section className={`${cn()} ${className}`}>
        <div className={cn('infoBlock')}>
          <span className={cn('userInfo')}>{item.author.profile.name}</span>
          <span className={cn('date')}>
            {item.dateCreate.toLocaleString('ru-RU')}
          </span>
        </div>
        <div className={cn('text')}>{item.text}</div>
        <TextButton onClick={()=>setCommState(true)}>Ответить</TextButton>
        {commState && <CommentAnswerBlock cancel={()=>setCommState(false)} onChange={onChange}/>}
      </section>
      <section className={cn('answer')}>
        {children}
      </section>
    </>
  );
}

export default Comment;
