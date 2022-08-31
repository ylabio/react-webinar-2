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
import {selectCommentsTotal} from '../../store-redux/comments-slice';
import {fetchAllUsers} from '../../store-redux/users-slice';

function Comments(props) {
  const dispatch = useDispatch();

  const comments = useSelectorRedux(selectAllComments);
  const isVisible = useSelectorRedux(isFormVisible);
  const commentsTotal = useSelectorRedux(selectCommentsTotal);

  // получаем дерево из массива комментариев
  const commentsTree = listToTreeWithParentId(comments, props.articleId);
  // поулчаем из дерева структуру списка комментариев с разметкой (отступы при вложенности) и компонентом комментария
  const content = treeToListWithUlHtmlMarkup(commentsTree, elem => {
    return (
      <ListItem>
        <CommentCardContainer comment={elem} />
      </ListItem>
    );
  });

  const selectStore = useSelector(state => ({
    exists: state.session.exists
  }));

  useInit(() => {
    if (selectStore.exists) {
      Promise.all([
        dispatch(fetchComments(props.articleId)).unwrap(),
        dispatch(fetchAllUsers()).unwrap()
      ]);
    }
  });

  return (
    <Stack>
      <h2>Комментарии ({commentsTotal})</h2>
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
