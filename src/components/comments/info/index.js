import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './styles.css';

const CommentsInfo = React.forwardRef(
  ({ userName, date, text, openForm, marginLeft, renderForm, changeCurrentOpenForm, t }, ref) => {
    const cn = bem('CommentsInfo');

    const onOpenForm = () => {
      openForm();
      changeCurrentOpenForm();
    };

    return (
      <div className={cn()} style={{ marginLeft }} ref={ref}>
        <div className={cn('data')}>
          <div className={cn('userName')}>{userName}</div>
          <div className={cn('date')}>{date}</div>
        </div>
        <p className={cn('text')}>{text}</p>
        <span className={cn('response')} onClick={onOpenForm}>
          {t('comment.reply')}
        </span>
        {renderForm()}
      </div>
    );
  }
);

CommentsInfo.propTypes = {
  userName: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  openForm: propTypes.func.isRequired,
  marginLeft: propTypes.number,
  renderForm: propTypes.func,
  changeCurrentOpenForm: propTypes.func,
  t: propTypes.func,
};

CommentsInfo.defaultProps = {
  marginLeft: 0,
  renderForm: () => {},
  t: (text) => text,
};

export default React.memo(CommentsInfo);
