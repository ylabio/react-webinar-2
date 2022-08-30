import React from 'react';
import propTypes from 'prop-types';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import {
  isFormVisible,
  selectAllComments
} from '../../store-redux/comments-slice';
import {fetchComments} from '../../store-redux/comments-slice/thunks';
import CommentCardContainer from '../comment-card-container';
import Stack from '../../components/stack';
import {listToTreeWithParentId} from '../../utils/list-to-tree';
import {treeToListWithUlHtmlMarkup} from '../../utils/tree-to-list';
import CommentsList from '../../components/comments-list';
import ProtectedCommentForm from '../protected-comment-form';
import useSelector from '../../hooks/use-selector';
import NewCommentForm from '../../components/new-comment-form';
import useInit from '../../hooks/use-init';
import ListItem from '../../components/list-item';

function Comments(props) {
  const dispatch = useDispatch();

  const comments = useSelectorRedux(selectAllComments);
  const isVisible = useSelectorRedux(isFormVisible);

  // получаем дерево из массива комментариев
  const commentsTree = listToTreeWithParentId(comments, props.articleId);
  // поулчаем из дерева структуру списка комментариев с разметкой (отступы при вложенности) и компонентом комментария
  const content = treeToListWithUlHtmlMarkup(commentsTree, elem => (
    <ListItem>
      <CommentCardContainer comment={elem} />
    </ListItem>
  ));

  const selectStore = useSelector(state => ({
    exists: state.session.exists
  }));

  useInit(() => {
    if (selectStore.exists) {
      dispatch(fetchComments(props.articleId));
    }
  });

  return (
    <>
      <CommentsList>{content}</CommentsList>
      {isVisible ? (
        <ProtectedCommentForm callbackGuardCondition={() => selectStore.exists}>
          <NewCommentForm parentId={props.articleId} />
        </ProtectedCommentForm>
      ) : null}
    </>
  );
}

Comments.propTypes = {
  articleId: propTypes.string
};

export default React.memo(Comments);
