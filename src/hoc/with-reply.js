import React, { useCallback } from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import actionsComments from '../store-redux/comments/actions';
import {useParams} from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import CommentInput from "../containers/comment-input";

export const withReply = (Component) => (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const storeRedux = useStoreRedux();

  const select = useSelectorRedux(state => ({
    commentId: state.comments.commentId,
  }), shallowEqual);

  const callbacks = {
    openText: useCallback(() =>
      storeRedux.dispatch(actionsComments.setCommentId(props.comment._id)), [props.comment._id, select.commentId]
    ),

    closeText: useCallback(() =>
      storeRedux.dispatch(actionsComments.setCommentId('')), [props.comment._id, select.commentId]
    ),

    onSend: useCallback(async (data) => {
      callbacks.closeText();
      await storeRedux.dispatch(actionsComments.send(data, props.comment._id, 'comment'));
      await storeRedux.dispatch(actionsComments.load(params.id));
    }, []),

    redirect: useCallback(() => {
      navigate('/login', {state: { back: location.pathname }});
    })
  }

  return (
    <div className='Comment-wrap'>
      <Component {...props} />
      <button className='Comment-button' onClick={callbacks.openText}>Ответить</button>
      <CommentInput
        commentId={select.commentId}
        _id={props.comment._id}
        onSend={callbacks.onSend}
        redirect={callbacks.redirect}
        closeText={callbacks.closeText}
      />
    </div>)
}
