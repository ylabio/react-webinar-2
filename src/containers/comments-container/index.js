import React from 'react';
import propTypes from 'prop-types';
import { useSelector as useSelectorR, useStore } from 'react-redux';
import Comments from '../../components/comments';
import commentsActions from '../../store-redux/comments/actions';
import useSelector from '../../hooks/use-selector';

function CommentsContainer({ items }) {
  const { dispatch } = useStore();
  const { total } = useSelectorR(state => ({
    total: state.comments.total,
  }));
  const { exists } = useSelector(state => ({
    exists: state.session.exists,
  }));

  return (
    <>
      <Comments 
        items={items} 
        total={total} 
        exists={exists} 
        link={'/login'}
      />
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