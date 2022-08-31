import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import Comment from '../../components/comment';
import { useSelector as useSelectorR, useStore } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';

function CommentContainer({ 
  data,
  lvl,
  link,
  setShowCommentForm,
  lastCommentId,
  setLastCommentId,
  createResponse,
}) {
  const { dispatch } = useStore();
  const { lastCreatedId } = useSelectorR(state => ({
    lastCreatedId: state.comments.lastCreatedId,
  }));
  const { exists } = useSelector(state => ({
    exists: state.session.exists,
  }));

  const callbacks = {
    addCommentPosition: useCallback((id, fromTop) => {
      dispatch(commentsActions.addCommentPosition(id, fromTop - 104));
    }, []),
  };
  
  return (
    <Comment
      data={data} 
      lvl={lvl} 
      exists={exists}
      link={link}
      setShowCommentForm={setShowCommentForm}
      lastCommentId={lastCommentId}
      setLastCommentId={setLastCommentId}
      createResponse={createResponse}
      addCommentPosition={callbacks.addCommentPosition}
      lastCreatedId={lastCreatedId}
    />
  );
}

CommentContainer.propTypes = {
  data: propTypes.object.isRequired,
  lvl: propTypes.number.isRequired,
  link: propTypes.string.isRequired,
  setShowCommentForm: propTypes.func.isRequired,
  lastCommentId: propTypes.string,
  setLastCommentId: propTypes.func.isRequired,
  createResponse: propTypes.func.isRequired,
};

CommentContainer.defaultProps = {
  lastCommentId: '',
  lastCommentId: null,
};

export default React.memo(CommentContainer);

