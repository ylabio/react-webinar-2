import React, {useCallback} from 'react';
import {useSelector as useSelectorRedux, useStore as useStoreRedux} from 'react-redux';
import CommentForm from '../../components/comment-form';
import SignInToComment from '../../components/sign-in-to-comment';
import {useSession} from '../../hooks/use-session';
import useTranslate from '../../hooks/use-translate';
import actionsComments from '../../services/store-redux/comments/actions';

function ProtectedCommentForm({level, isAnswer}) {
  const {isDenied, isChecking} = useSession();
  const store = useStoreRedux();
  const select = useSelectorRedux(state => ({
    articleId: state.article.data._id,
    commentText: state.comments.comment
  }));

  const {t} = useTranslate();

  const callbacks = {
    onSubmit: useCallback(() => {
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
      {isDenied || isChecking ? (
        <SignInToComment
          level={level}
          backId={select.articleId}
          isAnswer={isAnswer}
          onCancel={callbacks.onCancel}
          text={{
            signIn: t('comments.sign-in'),
            toCanReply: t('comments.to-can-reply'),
            cancel: t('comments.cancel')
          }}
        />
      ) : (
        <CommentForm
          level={level}
          text={{
            head: isAnswer ? t('comments.new-reply') : t('comments.new-comment'),
            send: t('comments.send'),
            cancel: t('comments.cancel')
          }}
          commentText={select.commentText}
          isAnswer={isAnswer}
          onSubmit={callbacks.onSubmit}
          onCancel={callbacks.onCancel}
          onEdit={callbacks.onEdit}
        />
      )}
    </>
  );
}

export default React.memo(ProtectedCommentForm);
