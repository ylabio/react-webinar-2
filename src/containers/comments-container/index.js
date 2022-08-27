import React from 'react';
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
  }

  return (
    <>
      <Comments 
        items={items} 
        total={total} 
        exists={exists} 
        link={'/login'}
        createResponse={createResponse}
        productId={productId}
      />
    </>
  );
}

CommentsContainer.propTypes = {
  productId: propTypes.string.isRequired,
};

CommentsContainer.defaultProps = {
};

export default React.memo(CommentsContainer);