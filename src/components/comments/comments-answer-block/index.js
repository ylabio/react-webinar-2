import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentAnswerBlock({send, cancel, onChange}) {
  // CSS классы по БЭМ
  const cn = bem('NewCommentBlock');
  return (
    <section className={cn()}>
      <span className={cn('title')}>Новый ответ</span>
      <textarea className={cn('input')} onChange={(e)=>onChange(e.target.value)} />
      <div className={cn('buttonBlock')}>
        <button onClick={send}>Отправить</button>
        <button onClick={cancel}>Отмена</button>
      </div>
    </section>
  );
}

CommentAnswerBlock.propTypes = {
  send: propTypes.func,
  cancel: propTypes.func,
  onChange: propTypes.func,
};

CommentAnswerBlock.defaultProps = {};

export default React.memo(CommentAnswerBlock);