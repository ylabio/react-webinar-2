import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchComments,
  selectAllComments,
  selectCommentsTotal
} from '../../store-redux/comments-slice';
import List from '../../components/list';
import CommentCardContainer from '../comment-card-container';
import Stack from '../../components/stack';
import {listToTreeWithParentId} from '../../utils/list-to-tree';
import treeToList, {treeToListWithUlHtmlMarkup} from '../../utils/tree-to-list';
import CommentsList from '../../components/comments-list';

function Comments(props) {
  const dispatch = useDispatch();

  const comments = useSelector(selectAllComments);
  const commentsTree = listToTreeWithParentId(comments, props.articleId);
  const content = treeToListWithUlHtmlMarkup(commentsTree, elem => (
    <CommentCardContainer comment={elem} />
  ));

  useEffect(() => {
    dispatch(fetchComments(props.articleId));
  }, []);

  return (
    <Stack spacing={'big'}>
      <CommentsList>{content}</CommentsList>
    </Stack>
  );
}

Comments.propTypes = {
  articleId: propTypes.string
};

export default React.memo(Comments);

//TODO: <ul> <li> - уходят отсупами за экран при привышении определенного количества элементов
