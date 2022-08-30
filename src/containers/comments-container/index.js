import React, { useCallback, useEffect } from 'react';
import propTypes from 'prop-types';
import { useSelector as useSelectorR, useStore } from 'react-redux';
import Comments from '../../components/comments';
import commentsActions from '../../store-redux/comments/actions';
import useSelector from '../../hooks/use-selector';

function CommentsContainer({ productId }) {
  const { dispatch } = useStore();
  const { total, items, branchesState, commentPositions, lastCreatedId } = useSelectorR(state => ({
    total: state.comments.total,
    items: state.comments.data.items,
    branchesState: state.comments.branchesState,
    commentPositions: state.comments.commentPositions,
    lastCreatedId: state.comments.lastCreatedId,
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

    addCommentPosition: useCallback((id, fromTop) => {
      dispatch(commentsActions.addCommentPosition(id, fromTop - 104));
    }, []),
  };

  useEffect(() => {
    if (lastCreatedId !== null) {
      window.scrollTo({top: commentPositions[lastCreatedId]});
      setTimeout(() => {
        dispatch(commentsActions.setLastCreatedId(null));
      }, 1000);
    } 
  }, [lastCreatedId, commentPositions])

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
        addCommentPosition={callbacks.addCommentPosition}
        lastCreatedId={lastCreatedId}
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