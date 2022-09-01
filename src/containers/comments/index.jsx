import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual } from "react-redux";
import useSelector from "../../hooks/use-selector";
import actionsComments from '../../store-redux/comments/actions';

import CommentsLayout from '../../components/comments-layout';
import Spinner from '../../components/spinner';
import CommentsList from '../../components/comments-list';
import CommentItem from '../../components/comment-item';
import UnloggedUser from '../../components/unlogged-user';
import CommentForm from '../../components/comment-form';

const Comments = ({ items, articleId }) => {
  const storeRedux = useStoreRedux();

  const reduxSelect = useSelectorRedux(state => ({
    loadError: state.comments.error,
    parentId: state.comments.parentId, // _id комментария / товара к которому пишется ответ
    commentSending: state.comments.sending, // отправка комментария
  }), shallowEqual);

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

  const renders = {
    comment: useCallback(item => (<>
      <CommentItem data={item} onReply={callbacks.openForm} />

      {item._id === reduxSelect.parentId && (select.logged
        ? <Spinner active={reduxSelect.commentSending}>
            <CommentForm onSubmit={callbacks.sendComment} onClose={callbacks.closeForm} />
          </Spinner>
        : <UnloggedUser />
      )}
    </>), [reduxSelect.parentId, select.logged, reduxSelect.commentSending]),
  };

  return (
    <CommentsLayout error={reduxSelect.loadError} title={
      items.length ? `Комментарии (${items.length})` : 'Комментарии'
    }>
      <CommentsList items={items} render={renders.comment} />

      {articleId !== reduxSelect.parentId
        ? <button onClick={callbacks.openForm}>Комментировать</button>
        : select.logged
          ? <Spinner active={reduxSelect.commentSending}>
              <CommentForm onSubmit={callbacks.sendComment} onClose={callbacks.closeForm} />
            </Spinner>
          : <UnloggedUser />}
    </CommentsLayout>
  )
}

Comments.propTypes = {
  items: PropTypes.array,
  articleId: PropTypes.string,
};

export default React.memo(Comments);