import React, { useCallback, useRef } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function NewComment(props) {
  const cn = bem('NewComment');

  const ref = useRef('');

  const callbacks = {
    onSubmit: useCallback((e) => {
      e.preventDefault();
      const data = ref.current.elements.comment.value;
      props.send(data);
    }, []),
  }

  return (
    <form ref={ref} className={cn()} onSubmit={callbacks.onSubmit}>
      <span className={cn('title')}>{props.title}</span>
      <textarea id={'comment'} className={cn('text')}></textarea>
      <div className={cn('btns-container')}>
        <button type='submit'>Отправить</button>
        {props.children}
      </div>
    </form>
  )
}

NewComment.propTypes = {
  title: propTypes.string,
  children: propTypes.node,
  send: propTypes.func,
}

export default React.memo(NewComment);
