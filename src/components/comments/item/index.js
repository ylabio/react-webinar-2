import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './styles.css';

function CommentsItem({ userName, date, text, renderForm }) {
  const cn = bem('CommentsItem');

  return (
    <div className={cn()}>
      <div className={cn('info')}>
        <div className={cn('userName')}>{userName}</div>
        <div className={cn('date')}>{date}</div>
      </div>
      <p className={cn('text')}>{text}</p>
      {renderForm()}
    </div>
  );
}

CommentsItem.propTypes = {
  userName: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  renderForm: propTypes.func.isRequired,
};

CommentsItem.defaultProps = {};

export default React.memo(CommentsItem);
