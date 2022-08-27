import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchComments,
  selectAllComments,
  selectCommentsTotal
} from '../../store-redux/comments-slice';
import List from '../../components/list';
import CommentCard from '../../components/comment-card';

function CommentCardContainer(props) {
  return <CommentCard text={props.comment.text} />;
}

CommentCardContainer.propTypes = {
  comment: propTypes.object
};

export default React.memo(CommentCardContainer);
