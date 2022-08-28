import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './styles.css';

// минимальная высота textarea
const MIN_TEXTAREA_HEIGHT = 80;

function CommentsForm({ title, closeForm, articleComment, addComment, changeCurrentOpenForm }) {
  const cn = bem('CommentsForm');

  const textareaRef = React.useRef(null);
  const [formValue, setFormValue] = useState('');

  // увеличение высоты textarea по мере ее наполнения
  useEffect(() => {
    // Reset height - important to shrink on delete
    textareaRef.current.style.height = 'inherit';
    // Set height
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [formValue]);

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      addComment(formValue);
      setFormValue('');
    },
    onCloseForm: (e) => {
      e.preventDefault();
      closeForm();
      changeCurrentOpenForm();
    },
  };

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <div className={cn('title')}>{title}</div>
      <textarea
        ref={textareaRef}
        className={cn('textarea')}
        value={formValue}
        onChange={(e) => setFormValue(e.currentTarget.value)}
      />
      <div className={cn('buttons')}>
        <button type="submit">Отправить</button>
        {!articleComment && <button onClick={callbacks.onCloseForm}>Отмена</button>}
      </div>
    </form>
  );
}

CommentsForm.propTypes = {
  title: propTypes.string,
  closeForm: propTypes.func,
  articleComment: propTypes.bool,
  addComment: propTypes.func,
  changeCurrentOpenForm: propTypes.func,
};

CommentsForm.defaultProps = {
  title: 'Новый комментарий',
  closeForm: () => {},
  articleComment: false,
  addComment: () => {},
  changeCurrentOpenForm: () => {},
};

export default React.memo(CommentsForm);
