import React, { useCallback } from "react";
import propTypes from 'prop-types';
import CommentsBranch from "../../components/comments-branch";
import { useSelector as useSelectorR, useStore } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';

function BranchContainer({ 
  branch, 
  link,
  setShowCommentForm,
  lastCommentId,
  setLastCommentId,
  createResponse,
  branchState,
}) {
  const { dispatch } = useStore();
  const { lastCreatedId } = useSelectorR(state => ({
    lastCreatedId: state.comments.lastCreatedId,
  }));
  const { exists } = useSelector(state => ({
    exists: state.session.exists,
  }));

  const callbacks = {
    updateBranchState: useCallback((branchData) => {
      dispatch(commentsActions.setBranches(branchData));
    }, []),
  };

  return (
    <CommentsBranch
      branch={branch} 
      exists={exists}
      link={link}
      setShowCommentForm={setShowCommentForm}
      lastCommentId={lastCommentId}
      setLastCommentId={setLastCommentId}
      createResponse={createResponse}
      updateBranchState={callbacks.updateBranchState}
      branchState={branchState}
      lastCreatedId={lastCreatedId}
    />
  );
}

BranchContainer.propTypes = {
  branch: propTypes.array.isRequired, 
  link: propTypes.string.isRequired,
  setShowCommentForm: propTypes.func.isRequired,
  lastCommentId: propTypes.string,
  setLastCommentId: propTypes.func.isRequired,
  createResponse: propTypes.func.isRequired,
  branchState: propTypes.oneOfType([
    propTypes.object.isRequired, 
    propTypes.bool.isRequired
  ]),
};

BranchContainer.defaultProps = {
  lastCommentId: '',
};

export default React.memo(BranchContainer);