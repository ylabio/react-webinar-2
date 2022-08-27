import React, {useCallback} from 'react';
import {useSelector as useSelectorRedux, useStore as useStoreRedux} from 'react-redux';
import CommentForm from '../../components/comment-form';
import SignInToComment from '../../components/sign-in-to-comment';
import {useSession} from '../../hooks/use-session';
import actionsComments from '../../store-redux/comments/actions';

function ProtectedCommentForm({head, level, isAnswer, parentId}) {
  const {isDenied} = useSession();
  const store = useStoreRedux();
  const select = useSelectorRedux(state => ({
    articleId: state.article.data._id
  }));

  const callbacks = {
    onSubmit: useCallback(text => {
      store.dispatch({
        type: 'comments/set-form-placement',
        payload: {formPlacement: select.articleId}
      });

      store.dispatch(
        actionsComments.post(select.articleId, isAnswer ? 'comment' : 'article', text)
      );
    }, []),
    onCancel: useCallback(() => {
      store.dispatch({
        type: 'comments/set-form-placement',
        payload: {formPlacement: select.articleId}
      });
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
        />
      )}
    </>
  );
}

export default React.memo(ProtectedCommentForm);
