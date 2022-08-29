import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useStore as useStoreRedux, useSelector as useSelectorRedux} from "react-redux";
import useSelector from "../../hooks/use-selector";
import actionsComments from '../../store-redux/comments/actions';
import Comments from "../../components/comments";
import {useNavigate} from "react-router-dom";

const CommentsContainer = ({items, articleId}) => {
  const storeRedux = useStoreRedux();
  const navigate = useNavigate();

  const parentId = useSelectorRedux(state => state.comments.parentId);

  const select = useSelector(state => ({
    logged: state.session.exists,
    userId: state.session.user._id,
  }));

  const callbacks = {
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
    openForm: useCallback(_id => {
      storeRedux.dispatch({type: 'comments/setParentId', payload: _id});
    }, []),
    closeForm: useCallback(() => {
      storeRedux.dispatch({type: 'comments/setParentId', payload: ''});
    }, []),
    sendComment: useCallback(text => {
      storeRedux.dispatch(actionsComments.send(text, select.userId, parentId, articleId));
    }, [parentId]),
  };

  return (
    <Comments
      comments={items}
      parentId={parentId}
      open={callbacks.openForm}
      close={callbacks.closeForm}
      send={callbacks.sendComment}
      logged={select.logged}
      login={callbacks.onSignIn}
    />
  )
}

CommentsContainer.propTypes = {
  items: PropTypes.array,
  articleId: PropTypes.string,
};

export default React.memo(CommentsContainer);