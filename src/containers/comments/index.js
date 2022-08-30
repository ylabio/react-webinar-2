import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import {
  isFormVisible,
  selectAllComments
} from '../../store-redux/comments-slice';
import {fetchComments} from '../../store-redux/comments-slice/thunks';
import List from '../../components/list';
import CommentCardContainer from '../comment-card-container';
import Stack from '../../components/stack';
import {listToTreeWithParentId} from '../../utils/list-to-tree';
import treeToList, {treeToListWithUlHtmlMarkup} from '../../utils/tree-to-list';
import CommentsList from '../../components/comments-list';
import ProtectedCommentForm from '../protected-comment-form';
import useSelector from '../../hooks/use-selector';
import NewCommentForm from '../../components/new-comment-form';

function Comments(props) {
  const dispatch = useDispatch();

  const comments = useSelectorRedux(selectAllComments);
  const isVisible = useSelectorRedux(isFormVisible);
  const commentsTree = listToTreeWithParentId(comments, props.articleId);
  const content = treeToListWithUlHtmlMarkup(commentsTree, elem => (
    <CommentCardContainer comment={elem} />
  ));

  const selectStore = useSelector(state => ({
    exists: state.session.exists
  }));

  useEffect(() => {
    if (selectStore.exists) {
      dispatch(fetchComments(props.articleId));
    }
  }, []);

  return (
    <Stack spacing={'big'}>
      <CommentsList>{content}</CommentsList>
      {isVisible ? (
        <ProtectedCommentForm callbackGuardCondition={() => selectStore.exists}>
          <NewCommentForm parentId={props.articleId} />
        </ProtectedCommentForm>
      ) : null}
    </Stack>
  );
}

Comments.propTypes = {
  articleId: propTypes.string
};

export default React.memo(Comments);

//TODO: <ul> <li> - уходят отсупами за экран при привышении определенного количества элементов
