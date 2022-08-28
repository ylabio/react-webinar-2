import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';

function CommentsEntry({link, t}) {
  const cn = bem('CommentsEntry');

  return (
    <div className={cn()}><Link to={link}>{t('comments.signIn')}</Link>{t('comments.toBeAnleToComment')}</div>
  )
}

CommentsEntry.propTypes = {
  link: propTypes.string,
  t: propTypes.func
}

CommentsEntry.defaultProps = {
  t: (text) => text,
  link: ''
}

export default React.memo(CommentsEntry);