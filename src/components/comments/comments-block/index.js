import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Comment from '../comment';
import NewCommentBlock from '../new-comment';
import {Link} from 'react-router-dom';

function CommentsBlock({exists, items, count, addComment, onChange}) {
  // CSS классы по БЭМ
  const cn = bem('CommentsBlock');
console.log(items);
  const [commentState, setCommentState] = useState(false);
  // const [commText, setCommText] = useState('');

  const Comments = ({items}) => (
    <>
      {items.map((item) => (
        <Comment key={item._id} item={item}>
          {item.children && item.children.length 
          ? item.children.map(child=>(<Comments key={child._id} items={item.children} />
          )) : null}
        </Comment>
      ))}
    </>
  );

  return (
    <div className={cn()}>
      <div className={cn('header')}>{`Комментарии (${
        exists ? count : 0
      })`}</div>
      {exists ? (
        <Comments items={items} />
      ) : (
        <span>
          <Link to={'/login'}>Войдите,</Link> чтобы иметь возможность
          комментировать
        </span>
      )}
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
