import React, { useCallback, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function NewComment(props) {
  const cn = bem('NewComment');
  const [text, setText] = useState('');

  const callbacks = {
    onChange: useCallback(e => {
      setText(e.target.value);
    }, []),
    // Отправка ответа
    onSubmit: useCallback(e => {
      e.preventDefault();
      if (text.trim()) {
        props.onSubmit(text);
        setText('');
      }
    }, [text])
  };

  return (
    <div className={cn()}>
      <form onSubmit={callbacks.onSubmit}>
        <label className={cn('title')} htmlFor="text">{props.title}</label>
        <textarea id="text" value={text} onChange={callbacks.onChange} />
        <div className={cn('buttons')}>
          <button type="submit">{props.send}</button>
          {props.children}
        </div>
      </form>
    </div>
  );
}

NewComment.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  send: PropTypes.string.isRequired,
  children: PropTypes.node
};

NewComment.defaultProps = {
  placeholder: ''
};

export default React.memo(NewComment);
