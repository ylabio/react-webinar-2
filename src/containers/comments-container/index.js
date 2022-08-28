import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { useSelector as useSelectorR, useStore } from 'react-redux';
import Comments from '../../components/comments';
import commentsActions from '../../store-redux/comments/actions';
import useSelector from '../../hooks/use-selector';

function CommentsContainer({ productId }) {
  const { dispatch, getState } = useStore();
  const { total, items, branchesState } = useSelectorR(state => ({
    total: state.comments.total,
    items: state.comments.data.items,
    branchesState: state.comments.branchesState,
  }));
  const { exists } = useSelector(state => ({
    exists: state.session.exists,
  }));

  const callbacks = {
    createResponse: useCallback((text, id, type) => {
      dispatch(commentsActions.create({
        text: text,
        parent: {
          _id: id,
          _type: type,
        },
      }));
    }, []),

    updateBranchState: useCallback((branchData) => {
      dispatch(commentsActions.setBranches(branchData));
    }, []),
  };

  return (
    <>
      <Comments 
        items={items} 
        total={total} 
        exists={exists} 
        link={'/login'}
        createResponse={callbacks.createResponse}
        productId={productId}
        updateBranchState={callbacks.updateBranchState}
        branchesState={branchesState}
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