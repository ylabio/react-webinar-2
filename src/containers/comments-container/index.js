import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { useSelector as useSelectorR, useStore } from 'react-redux';
import Comments from '../../components/comments';
import commentsActions from '../../store-redux/comments/actions';
import useSelector from '../../hooks/use-selector';

function CommentsContainer({ productId }) {
  const { dispatch } = useStore();
  const { total, items } = useSelectorR(state => ({
    total: state.comments.total,
    items: state.comments.data.items,
  }));
  const { exists } = useSelector(state => ({
    exists: state.session.exists,
  }));

  function createResponse(text, id, type) {
    dispatch(commentsActions.create({
      text: text,
      parent: {
        _id: id,
        _type: type,
      },
    }));
    
    setTimeout(() => {
      dispatch(commentsActions.getAll(productId))
    }, 0);
  }

  return (
    <>
      <Comments 
        items={items} 
        total={total} 
        exists={exists} 
        link={'/login'}
        createResponse={createResponse}
      />
    </>
  );
}

CommentsContainer.propTypes = {
};

CommentsContainer.defaultProps = {
};

export default CommentsContainer;