import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CommentsEntry({onSignIn, t}) {
  const cn = bem('CommentsEntry');

  return (
    <div className={cn()}><span className={cn('signIn')} onClick={()=>{onSignIn()}}>{t('comments.signIn')}</span>{t('comments.toBeAnleToComment')}</div>
  )
}

CommentsEntry.propTypes = {
  link: propTypes.string,
  t: propTypes.func,
  onSignIn: propTypes.func.isRequired
}

CommentsEntry.defaultProps = {
  t: (text) => text,
}

export default React.memo(CommentsEntry);