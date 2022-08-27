import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function NewComment(props) {
  const cn = bem('NewComment');

  const callbacks = {
    onSubmit: useCallback((e) => {
      e.preventDefault()
      console.log('Submit')
    }, [])
  }

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <span className={cn('title')}>{props.title}</span>
      <textarea className={cn('text')}></textarea>
      <div className={cn('btns-container')}>
        <button type='submit'>Отправить</button>
        {props.button}
      </div>
    </form>
  )
}

NewComment.propTypes = {
  title: propTypes.string,
  button: propTypes.node,
}

export default React.memo(NewComment);
