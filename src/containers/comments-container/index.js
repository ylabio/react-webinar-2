import React from 'react';
import propTypes from 'prop-types';
import { useSelector, useStore } from 'react-redux';
import Comments from '../../components/comments';
import commentsActions from '../../store-redux/comments/actions';

function CommentsContainer({ items }) {
  const { dispatch } = useStore();
  const { total } = useSelector(state => state.comments);

  return (
    <>
      <Comments items={items} total={total} />
      {/* <button onClick={() => {
        dispatch(commentsActions.create({
          text: 'son of the second child',
          parent: {
            _id: '630808aa9f8e7d649942cd6b',
            _type: 'comment',
          },
        }))
      }} >_create</button> */}
    </>
  );
}

CommentsContainer.propTypes = {
};

CommentsContainer.defaultProps = {
};

export default CommentsContainer;