import React, { useCallback, useMemo, useState } from 'react';
import { shallowEqual, useSelector as useSelectorRedux, useStore as useStoreRedux } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Comment from '../../components/comments/comment';
import LayoutComments from '../../components/comments/layout-comment';
import NewComment from '../../components/comments/new-comment';
import SignIn from '../../components/comments/sign-in';
import Spinner from '../../components/spinner';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import actionsComments from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

function Comments(props) {
  const location = useLocation();

  const [currentAnswer, setCurrentAnswer] = useState('');
  const storeRedux = useStoreRedux();
  const select = useSelector(state => ({
    exists: state.session.exists,
    locale: state.locale.lang
  }));
  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data,
    newCommentId: state.comments.newCommentId,
    commentsCount: state.comments.count,
    commentsWaiting: state.comments.waiting
  }), shallowEqual);

  const { t } = useTranslate();

  const callbacks = {
    // Отправка комментария
    onSubmit: useCallback((text) => {
      const parent = currentAnswer
        ? { _id: currentAnswer, _type: 'comment' }
        : { _id: props.articleId, _type: 'article' };
      storeRedux.dispatch(actionsComments.post(text, parent));
      setCurrentAnswer('');
    }, [currentAnswer, selectRedux.article]),
    // Отменить ответ на комментарий
    cancel: useCallback(() => {
      setCurrentAnswer('');
    }, [])
  };

  const comments = useMemo(() => [
    ...treeToList(
      listToTree(selectRedux.comments, '_id', 'comment'),
      (item, level) => ({ item, level })
    )
  ], [selectRedux.comments]);

  return (
    <Spinner active={selectRedux.commentsWaiting}>
      <LayoutComments commentsCount={selectRedux.commentsCount} title={t('comments.title')}>
        {comments.map(comment =>
          <Comment
            key={comment.item._id}
            id={comment.item._id}
            user={comment.item.author.profile.name}
            date={comment.item.dateCreate}
            text={comment.item.text}
            setCurrentAnswer={setCurrentAnswer}
            locale={select.locale}
            level={comment.level}
            reply={t('comments.reply')}
            isFocus={comment.item._id === selectRedux.newCommentId}
          >
            {currentAnswer === comment.item._id && (select.exists
              ? <NewComment
                title={t('comments.newAnswer')}
                send={t('comments.send')}
                onSubmit={callbacks.onSubmit}
              >
                <button onClick={callbacks.cancel}>{t('comments.cancel')}</button>
              </NewComment>
              : <SignIn
                signIn={t('comments.signIn')}
                link="/login"
                pathname={location.pathname}
                text={t('comments.toAnswer')}
              >
                <button onClick={callbacks.cancel}>{t('comments.cancel')}</button>
              </SignIn>)
            }
          </Comment>
        )}
        {!currentAnswer && (select.exists
          ? <NewComment
            title={t('comments.newComment')}
            send={t('comments.send')}
            onSubmit={callbacks.onSubmit}
          />
          : <SignIn
            signIn={t('comments.signIn')}
            link="/login"
            pathname={location.pathname}
            text={t('comments.toComment')}
          />)
        }
      </LayoutComments>
    </Spinner>
  );
}

export default React.memo(Comments);
