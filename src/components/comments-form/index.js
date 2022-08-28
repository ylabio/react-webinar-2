import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsForm(props) {
  const cn = bem('CommentsForm');
  const [text, setText] = React.useState('');

  const payload = {
    text,
    parent: {
      _id: props.id,
      _type: props.type,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(payload);
    setText('');
    props.onClose ? props.onClose() : null;
  };

  return (
    <form className={`${cn()} ${props.type === 'comment' ? cn('answer') : null}`} onSubmit={handleSubmit}>
      <label className={cn('title')} htmlFor="textarea">
        {props.label}
      </label>
      <textarea
        className={cn('textarea')}
        name="textarea"
        type="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={cn('buttons')}>
        <button type="submit" disabled={!text}>
          Отправить
        </button>
        {props.onClose && (
          <button type="button" onClick={props.onClose}>
            Отменить
          </button>
        )}
      </div>
    </form>
  );
}

export default React.memo(CommentsForm);
