import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './styles.css';

function CommentsLoginText({ closeForm, t, articleComment }) {
  const cn = bem('CommentsLoginText');

  return (
    <div className={cn()}>
      <Link to="/login" className={cn('blue')}>
        Войдите
      </Link>
      , чтобы иметь возможность ответить.{' '}
      {!articleComment && (
        <span className={cn('gray')} onClick={closeForm}>
          Отмена
        </span>
      )}
    </div>
  );
}

CommentsLoginText.propTypes = {
  closeForm: propTypes.func,
  t: propTypes.func,
  articleComment: propTypes.bool,
};

CommentsLoginText.defaultProps = {
  closeForm: () => {},
  t: (text) => text,
  articleComment: false,
};

export default React.memo(CommentsLoginText);
