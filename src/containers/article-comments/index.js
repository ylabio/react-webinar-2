import React, { useCallback } from 'react';
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

const ArticleComments = ({ parentId }) => {
  const storeRedux = useStoreRedux();
  const location = useLocation();
  const navigate = useNavigate();
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
  }));
  // console.log({ com: selectRedux.comments }, selectRedux.count);

  const sortedList = listToTree(selectRedux.comments);
  console.log(sortedList);

  return (
    <LayoutFlex flex='start' indent='big'>
      <Spinner active={selectRedux.waiting}>
        <CommentsTitle title={t('comments.title')} count={selectRedux.count} />
        <CommentsList comments={sortedList} t={t} />
        <NewCommentForm t={t} />
      </Spinner>
    </LayoutFlex>
  );
};

export default ArticleComments;
