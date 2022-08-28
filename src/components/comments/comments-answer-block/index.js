import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentAnswerBlock({send, cancel, parent}) {
  const [message, setMessage] = useState('');
  // CSS классы по БЭМ
  const cn = bem('NewCommentBlock');

  const sendMsg = (e) => {
    e.preventDefault();
    send(message, parent);
    setMessage('');
  }
  return (
    <section className={cn()}>
      <span className={cn('title')}>Новый ответ</span>
      <textarea
        className={cn('input')}
        value={message}
        onChange={(e) => {setMessage(e.target.value)}}
      />
      <div className={cn('buttonBlock')}>
        <button onClick={sendMsg}>Отправить</button>
        <button onClick={cancel}>Отмена</button>
      </div>
    </section>
  );
}

CommentAnswerBlock.propTypes = {
  send: propTypes.func,
  cancel: propTypes.func,
};

CommentAnswerBlock.defaultProps = {};

export default React.memo(CommentAnswerBlock);
