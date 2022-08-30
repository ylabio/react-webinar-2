import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import Comments from '../../components/comments/layout';
import CommentsLoginText from '../../components/comments/login-text';
import dateFormat from '../../utils/date';
import useSelector from '../../hooks/use-selector';
import Comment from '../comment';
import CommentsForm from '../../components/comments/form';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import actionsComments from '../../store-redux/comments/actions';
import useInit from '../../hooks/use-init';

function CommentsList() {
  console.log('render CommentsList');
  const storeRedux = useStoreRedux();
  const { t, lang } = useTranslate();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const newCommentRef = useRef(null);

  const select = useSelector((state) => ({
    exists: state.session.exists,
    userId: state.session.user._id,
  }));
  const selectRedux = useSelectorRedux(
    (state) => ({
      comments: state.comments.data,
      count: state.comments.count,
      waiting: state.comments.waiting,
      currentOpenForm: state.comments.currentOpenForm,
      newCommentId: state.comments.newCommentId,
    }),
    shallowEqual
  );

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(params.id));
    newCommentRef.current = null;
  }, [params.id]);

  useEffect(() => {
    if (!newCommentRef.current) return;
    newCommentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selectRedux.newCommentId]);

  const callbacks = {
    addComment: useCallback((text) => {
      storeRedux.dispatch(actionsComments.addComment(params.id, select.userId, text, 'article'));
    }, []),
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  const options = {
    commentsWithChildren: useMemo(() => {
      return treeToList(listToTree(selectRedux.comments), (item, level) => ({ ...item, level }));
    }, [selectRedux.comments]),
  };

  const renders = {
    renderFormToArticle: useCallback(
      () => (
        <>
          {!selectRedux.currentOpenForm &&
            (!select.exists ? (
              <CommentsLoginText t={t} articleComment={true} onSignIn={callbacks.onSignIn} />
            ) : (
              <CommentsForm
                title={t('comment.newComment')}
                articleComment={true}
                addComment={callbacks.addComment}
                t={t}
              />
            ))}
        </>
      ),
      [select.exists, selectRedux.currentOpenForm, lang]
    ),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <Comments count={selectRedux.count} t={t}>
        {options.commentsWithChildren.map((comment) => (
          <Comment
            key={comment._id}
            userName={comment.author.profile.name}
            date={dateFormat(lang, comment.dateCreate)}
            text={comment.text}
            exists={select.exists}
            level={comment.level}
            commentId={comment._id}
            ref={comment._id === selectRedux.newCommentId ? newCommentRef : null}
          />
        ))}
        {renders.renderFormToArticle()}
      </Comments>
    </Spinner>
  );
}

export default React.memo(CommentsList);
