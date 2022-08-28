import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useStore as useStoreRedux, useSelector as useSelectorRedux } from "react-redux";
import useSelector from "../../hooks/use-selector";
import actionsComments from '../../store-redux/comments/actions';
import CommentItem from '../../components/comment-item';
import CommentForm from '../../components/comment-form';
import './style.css';

const Comments = ({ items, articleId }) => {
  const storeRedux = useStoreRedux();

  const parentId = useSelectorRedux(state => state.comments.parentId);
  // _id комментария / товара к которому пишется ответ

  const select = useSelector(state => ({
    logged: state.session.exists,
    userId: state.session.user._id,
  }));

  const callbacks = {
    openForm: useCallback(_id => {
      storeRedux.dispatch({ type: 'comments/setParentId', payload: _id });
    }, []),
    closeForm: useCallback(() => {
      storeRedux.dispatch({ type: 'comments/setParentId', payload: '' });
    }, []),
    sendComment: useCallback(text => {
      storeRedux.dispatch(actionsComments.send(text, select.userId, parentId, articleId));
    }, [parentId]),
  };

  const warn = (<p><Link to='/login'>Войдите</Link>, чтобы иметь возможность комментирования</p>);

  return (
    <div className='comments'>
      <h2>{`Комментарии (${items.length})`}</h2>

      <ul className='comments__list'>
        {items.map(item =>
          <li key={item._id} className='comments__list-item' style={
            { 'marginLeft': `${item.depth * 30}px`, }
          }>
            <CommentItem data={item} onReply={callbacks.openForm} />

            {item._id === parentId && (select.logged
              ? <CommentForm onSubmit={callbacks.sendComment} onClose={callbacks.closeForm} />
              : warn
            )}
          </li>
        )}
      </ul>

      {articleId === parentId && (select.logged
        ? <CommentForm onSubmit={callbacks.sendComment} onClose={callbacks.closeForm} />
        : warn
      )}

      <button onClick={() => callbacks.openForm(articleId)}>Комментировать</button>
    </div>
  )
}

Comments.propTypes = {
  items: PropTypes.array,
  articleId: PropTypes.string,
};

export default React.memo(Comments);