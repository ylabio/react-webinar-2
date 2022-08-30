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
  numberOfComments: propTypes.number,
  t: propTypes.func
}

CommentsTotal.defaultProps = {
  numberOfComments: 0,
  t: (text) => text 
}

export default React.memo(CommentsTotal);
