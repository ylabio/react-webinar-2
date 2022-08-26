import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import TextButton from '../../buttons/text-button';
import CommentAnswerBlock from '../comments-answer-block';

function Comment({item, onAnswer}) {
  // CSS классы по БЭМ
  const cn = bem('Comment');
  return (
    <>
      <section className={cn()}>
        <div className={cn('infoBlock')}>
          <span className={cn('userInfo')}>{item.author._id}</span>
          <span className={cn('date')}>
            {item.dateCreate.toLocaleString('ru-RU')}
          </span>
        </div>
        <div className={cn('text')}>{item.text}</div>
        {/* //TODO make button component */}
        <TextButton onClick={onAnswer}>Ответить</TextButton>
      </section>
      <CommentAnswerBlock />
    </>
  );
}

export default Comment;
