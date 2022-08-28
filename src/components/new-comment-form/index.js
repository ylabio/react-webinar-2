import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const NewCommentForm = ({ t }) => {
  const cn = bem('NewCommentForm');

  return (
    <form className={cn('')}>
      <label className={cn('label')}>
        {t('newComment.label')}
        <textarea className={cn('textarea')} />
      </label>
      <button className={cn('actions')}>{t('newComment.action')}</button>
    </form>
  );
};

NewCommentForm.propTypes = {
  t: propTypes.func,
};

NewCommentForm.defaultProps = {
  t: (text) => text,
};

export default React.memo(NewCommentForm);
