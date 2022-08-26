import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import {Link} from "react-router-dom";

function CommentRedirect({mainText, linkText, link, isDefault, cancelText, onCancel}) {
  const cn = bem('CommentRedirect');

  return (
  <div className={!isDefault ? cn({padding: true}) : cn()}>
    <Link className={cn('link')} to={link}>{linkText}</Link>
    {mainText}
    {isDefault ? '.' : ''}
    {isDefault ? <button className={cn('button')} type="button" onClick={onCancel}>{cancelText}</button> : null}
  </div>
  )
}

CommentRedirect.propTypes = {
  mainText: propTypes.string.isRequired,
  linkText: propTypes.string.isRequired,
  link: propTypes.string.isRequired,
  isDefault: propTypes.bool.isRequired,
  cancelText: propTypes.string.isRequired,
  onCancel: propTypes.func.isRequired,
}

export default React.memo(CommentRedirect);
