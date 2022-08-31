import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import { formatTime } from '../../utils/format-time';

function CommentBody({ 
  data,
  showResponse,
  showFormHandler,
}) {
  const cn = bem('Comment');

  return (
    <div className={cn('body')}>
      <div className={cn('header')}>
        <span className={cn('username')}>{data.author.profile.name}</span>
        <span className={cn('time')}>{formatTime(data.dateUpdate)}</span>
      </div>

      <p className={cn('text')}>
        {data.text}
      </p>

      {showResponse && (
        <span 
          className={cn('answer')}
          onClick={showFormHandler}
        >
          Ответить
        </span>
      )}
    </div> 
  );
}

CommentBody.propTypes = {
  data: propTypes.object.isRequired,
  showResponse: propTypes.bool,
  showFormHandler: propTypes.func.isRequired,
};

CommentBody.defaultProps = {
  showResponse: true,
};

CommentBody.propTypes = {
  data: propTypes.object.isRequired,
  showResponse: propTypes.bool,
  showFormHandler: propTypes.func.isRequired,
};

CommentBody.defaultProps = {
  showResponse: true,
};

export default React.memo(CommentBody);

