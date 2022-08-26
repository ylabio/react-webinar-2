import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentAnswerBlock({onAnswer, onChange}) {
  // CSS классы по БЭМ
  const cn = bem('NewCommentBlock');
  return (
    <section className={cn()}>
      <span className={cn('title')}>Новый ответ</span>
      <textarea className={cn('input')} onChange={onChange} />
      <div className={cn('buttonBlock')}>
        <button onClick={onAnswer}>Отправить</button>
        <button onClick={onAnswer}>Отмена</button>
      </div>
    </section>
  );
}

CommentAnswerBlock.propTypes = {
  onAnswer: propTypes.func,
  onChange: propTypes.func,
};

CommentAnswerBlock.defaultProps = {};

export default React.memo(CommentAnswerBlock);
