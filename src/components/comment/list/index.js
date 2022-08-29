import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

/**
 * Component description
 */

function CommentList({ list, comment, writter, t }) {
  const cn = bem('CommentList');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('comments.title')} ({list?.length - 1})</div>
      {list?.length ? list.map(item => item._type == 'writter' ? writter(item) : comment(item)) : null}
    </div>
  );
}

CommentList.propTypes = {
  list: propTypes.arrayOf(propTypes.object).isRequired,
  comment: propTypes.func,
  writter: propTypes.func,
  t: propTypes.func
}

CommentList.defaultProps = {
  list: [],
  comment: (item) => { return item.toString(); },
  writter: (item) => { return item.toString(); },
  t: () => { }
}

export default React.memo(CommentList);