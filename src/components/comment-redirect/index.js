import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Comment from '../comment';
import CommentForm from '../comment-form';
import { Link } from 'react-router-dom';
import comment from '../comment';

function CommentRedirect({ t, location }) {
  return (
    <span style={{ marginTop: '30px' }}>
      <Link to='/login' state={{ back: location }}>
        {t('comment.login')}
      </Link>
      {t('comment.login.text')}
    </span>
  );
}

export default React.memo(CommentRedirect);
