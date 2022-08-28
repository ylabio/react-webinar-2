import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CommentsTotal({numberOfComments, t}) {
  const cn = bem('CommentsTotal');

  return (
    <div className={cn()}>
      <div className={cn('numberOfComments')}><strong>{t('comments.comments')}</strong> ({numberOfComments})</div>
    </div>
  )
}

CommentsTotal.propTypes = {
  link: propTypes.string,
  t: propTypes.func
}

CommentsTotal.defaultProps = {
  t: (text) => text,
  link: ''
}

export default React.memo(CommentsTotal);
