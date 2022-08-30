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

  const reduxSelect = useSelectorRedux(state => ({
    loadError: state.comments.error,
    parentId: state.comments.parentId, // _id комментария / товара к которому пишется ответ
    commentSending: state.comments.sending, // отправка комментария
  }));

  const select = useSelector(state => ({
    logged: state.session.exists,
    userId: state.session.user._id,
  }));

  const callbacks = {
    openForm: useCallback(_id => {
      // при вызове с кнопки передаётся event
      if (typeof _id !== 'string') _id = articleId;
      storeRedux.dispatch({ type: 'comments/parentId-set', payload: _id });
    }, []),
    closeForm: useCallback(() => {
      storeRedux.dispatch({ type: 'comments/parentId-clear', });
    }, []),
    sendComment: useCallback(text => {
      storeRedux.dispatch(actionsComments.send(text, select.userId, reduxSelect.parentId, articleId));
    }, [reduxSelect.parentId]),
  };

  const unloggedUser = (<div><Link to='/login'>Войдите</Link>, чтобы иметь возможность комментирования</div>);

  return !reduxSelect.loadError ? (
    <div className='comments'>
      <h2>{items.length ? `Комментарии (${items.length})` : 'Комментарии'}</h2>

      <ul className='comments__list'>
        {items.map(item =>
          <li key={item._id} style={item.depth ? { 'marginLeft': `${item.depth * 30}px` } : null}>
            <CommentItem data={item} onReply={callbacks.openForm} />

            {item._id === reduxSelect.parentId && (select.logged
              ? <CommentForm onSubmit={callbacks.sendComment} onClose={callbacks.closeForm} sending={reduxSelect.commentSending} />
              : unloggedUser
            )}
          </li>
        )}
      </ul>

      {articleId === reduxSelect.parentId && (select.logged
        ? <CommentForm onSubmit={callbacks.sendComment} onClose={callbacks.closeForm} sending={reduxSelect.commentSending} />
        : unloggedUser
      )}

      {articleId !== reduxSelect.parentId && <button onClick={callbacks.openForm}>Комментировать</button>}
    </div>
  ) : (
    <div className='comments'>
      <h2>Ошибка при загрузке комментариев</h2>
    </div>
  )
}

Comments.propTypes = {
  items: PropTypes.array,
  articleId: PropTypes.string,
};

export default React.memo(Comments);