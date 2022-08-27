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

function Comments(props) {
  const dispatch = useDispatch();
  const commentsTotal = useSelector(selectCommentsTotal);
  const comments = useSelector(selectAllComments);

  useEffect(() => {
    dispatch(fetchComments(props.articleId));
  }, []);

  return (
    <>
      <h2>Комментарии ({commentsTotal})</h2>

      <Stack spacing="big">
        <List
          items={comments}
          renderItem={comment => <CommentCardContainer comment={comment} />}
        />
      </Stack>
    </>
  );
}

Comments.propTypes = {
  articleId: propTypes.string
};

export default React.memo(Comments);
