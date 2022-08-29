import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './styles.css';

function CommentsLoginText({ closeForm, t, articleComment, changeCurrentOpenForm, onSignIn }) {
  const cn = bem('CommentsLoginText');

  const onCloseForm = () => {
    closeForm();
    changeCurrentOpenForm();
  };

  return (
    <div className={cn()}>
      <span onClick={() => onSignIn()} to="/login" className={cn('blue')}>
        {t('comment.login')}
      </span>
      {t('comment.loginText')}{' '}
      {!articleComment && (
        <span className={cn('gray')} onClick={onCloseForm}>
          {t('comment.cancel')}
        </span>
      )}
    </div>
  );
}

CommentsLoginText.propTypes = {
  closeForm: propTypes.func,
  t: propTypes.func,
  articleComment: propTypes.bool,
  changeCurrentOpenForm: propTypes.func,
  onSignIn: propTypes.func.isRequired,
};

CommentsLoginText.defaultProps = {
  closeForm: () => {},
  t: (text) => text,
  articleComment: false,
  changeCurrentOpenForm: () => {},
};

export default React.memo(CommentsLoginText);
