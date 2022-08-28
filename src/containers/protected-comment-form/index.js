import React, {useCallback} from 'react';
import {useSelector as useSelectorRedux, useStore as useStoreRedux} from 'react-redux';
import CommentForm from '../../components/comment-form';
import SignInToComment from '../../components/sign-in-to-comment';
import {useSession} from '../../hooks/use-session';
import actionsComments from '../../services/store-redux/comments/actions';

function ProtectedCommentForm({head, level, isAnswer, parentId, parentType}) {
  const {isDenied} = useSession();
  const store = useStoreRedux();
  const select = useSelectorRedux(state => ({
    articleId: state.article.data._id,
    commentText: state.comments.comment
  }));

  const callbacks = {
    onSubmit: useCallback(text => {
      store.dispatch(actionsComments.post());
      callbacks.onCancel();
    }, []),

    onCancel: useCallback(() => {
      store.dispatch(actionsComments.setForm({_id: select.articleId, _type: 'article'}));
    }, [select.articleId]),

    onEdit: useCallback(updated => {
      store.dispatch(actionsComments.edit(updated));
    }, [])
  };

  return (
    <>
      {isDenied ? (
        <SignInToComment level={level} backId={select.articleId} />
      ) : (
        <CommentForm
          level={level}
          head={head}
          isAnswer={isAnswer}
          onSubmit={callbacks.onSubmit}
          onCancel={callbacks.onCancel}
          onEdit={callbacks.onEdit}
          commentText={select.commentText}
        />
      )}
    </>
  );
}

export default React.memo(ProtectedCommentForm);
