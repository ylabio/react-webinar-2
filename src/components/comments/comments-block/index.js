import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Comment from '../comment';
import NewCommentBlock from '../new-comment';

function CommentsBlock({items, addComment, onChange}) {
  // CSS классы по БЭМ
  const cn = bem('CommentsBlock');

	const [commentState, setCommentState] = useState(false);

  return (
    <div className={cn()}>
      <div className={cn('header')}>{`Комментарии (${items.length})`}</div>
      {items.map((item) => (
        <>
          <Comment key={item._id} item={item} onAdd={addComment} />
        </>
      ))}
      <NewCommentBlock />
    </div>
  );
}

CommentsBlock.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  addComment: propTypes.func,
  onChange: propTypes.func,
};

CommentsBlock.defaultProps = {
  items: [],
};

export default React.memo(CommentsBlock);
