import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function NewCommentBlock({addComment,userName}) {
  // CSS классы по БЭМ
  const cn = bem('NewCommentBlock');

  const [message, setMessage] = useState('');

  const sendMsg = (e) => {
    if(message.trim().length){
      e.preventDefault()
      addComment(message, userName)
      setMessage('')
    }
  }

  return (
    <section className={cn()}>
      <span className={cn('title')}>Новый комментарий</span>
      <textarea value={message} className={cn('input')} onChange={(e)=>setMessage(e.target.value)} />
			<button onClick={sendMsg}>Ответить</button>
    </section>
  );
}

NewCommentBlock.propTypes = {
  onAnswer: propTypes.func,
};

NewCommentBlock.defaultProps = {
};

export default React.memo(NewCommentBlock);
