import {cn as bem} from '@bem-react/classname';
import React from 'react';
import Comment from '../comment';

import './style.css';

function LayoutComments({comments, total}) {
  const cn = bem('LayoutComments');
  return (
    <div className={cn()}>
      <h2 className={cn('head')}>Комментарии {`(${total})`}</h2>
      <div className={cn('body')}>
        {comments.map(comment => {
          return <Comment data={comment.data} level={comment.level} key={comment.data._id} />;
        })}
      </div>
    </div>
  );
}

export default React.memo(LayoutComments);
