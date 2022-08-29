import React, { useCallback, useMemo, useState } from 'react';
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
} from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import shallowEqual from 'shallowequal';
import CommentsTitle from '../../components/comments-title';
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';
import actionsComments from '../../store-redux/comments/actions';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import LayoutFlex from '../../components/layout-flex';
import CommentsList from '../../components/comments-list';
import NewCommentForm from '../../components/new-comment-form';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import propTypes from 'prop-types';

const ArticleComments = ({ parentId }) => {
  const storeRedux = useStoreRedux();
  const location = useLocation();
  const navigate = useNavigate();
  const [parentCommsId, setParentCommsId] = useState(parentId);
  const { t } = useTranslate();

  useInit(() => {
    storeRedux.dispatch(actionsComments.load(parentId));
  }, [parentId]);

  const selectRedux = useSelectorRedux(
    (state) => ({
      comments: state.comments.data,
      count: state.comments.count,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  const selectStore = useSelector((state) => ({
    exists: state.session.exists,
    _id: state.session.user._id,
  }));

  const options = {
    comments: useMemo(
      () =>
        treeToList(
          listToTree(selectRedux.comments, undefined, parentId),
          (item, level) => ({ ...item, nestedLevel: level })
        ),
      [selectRedux.comments]
    ),
  };

  const callbacks = {
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    onPost: useCallback((text, parentId, parentType) => {
      storeRedux
        .dispatch(
          actionsComments.post({
            author: { _id: selectStore._id },
            text,
            parent: { _id: parentId, _type: parentType },
          })
        )
        // исправить
        .then(setParentCommsId(parentId));
    }, []),

    onCancel: useCallback(() => {
      setParentCommsId(parentId);
    }),

    onReply: useCallback((id) => {
      setParentCommsId(id);
    }),
  };

  return (
    <LayoutFlex flex='start' indent='big'>
      <Spinner active={selectRedux.waiting}>
        <CommentsTitle title={t('comments.title')} count={selectRedux.count} />
        <CommentsList
          comments={options.comments}
          onReply={callbacks.onReply}
          exists={selectStore.exists}
          onPost={callbacks.onPost}
          onCancel={callbacks.onCancel}
          t={t}
          parent={parentCommsId}
          onSignIn={callbacks.onSignIn}
        />
        {parentCommsId === parentId && (
          <NewCommentForm
            t={t}
            exists={selectStore.exists}
            onPost={callbacks.onPost}
            onSignIn={callbacks.onSignIn}
            parentId={parentId}
            type={'article'}
          />
        )}
      </Spinner>
    </LayoutFlex>
  );
};

ArticleComments.propTypes = {
  parentId: propTypes.string,
};

ArticleComments.defaultProps = {};

export default ArticleComments;
