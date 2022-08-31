import React, { useCallback, useState } from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import { Link } from "react-router-dom";
import './style.css';

function NewComment(props) {
  const cn = bem('NewComment');

  const [text, setText] = useState('');

  const callbacks = {
    changeText: useCallback((text) => setText(text), []),
    postComment: useCallback(() => {
      props.newComment(text);
      setText('');
    }, [text])
  }

  return (
    <div className={cn()}>
      {props.exists
        ? <>
          <div className={cn('title')}>Новый комментарий</div>
          <textarea onChange={(e) => callbacks.changeText(e.target.value)} value={text} className={cn('text')} placeholder='Текст' />
          <button className={cn('button')} onClick={() => callbacks.postComment()}>Отправить</button>
        </>
        : <div className={cn('auth')}>
          <a className={cn('link')} onClick={() => props.onSignIn()}>Войдите</a>, чтобы иметь возможность комментировать
        </div>}
    </div>
  )
}

NewComment.propTypes = {
  exists: propTypes.bool,
  newComment: propTypes.func,
  onSignIn: propTypes.func,

}

NewComment.defaultProps = {
  exists: false,
  newComment: () => { },
  onSignIn: () => { },
}

export default React.memo(NewComment)