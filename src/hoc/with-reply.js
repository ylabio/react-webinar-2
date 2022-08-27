import React, { useCallback } from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import NewComment from "../components/new-comment";
import actionsComments from '../store-redux/comments/actions';

export const withReply = (Component) => (props) => {
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
  }

  return (
    <div className='Comment-wrap'>
      <Component {...props} />
      <button className='Comment-button' onClick={callbacks.openText}>Ответить</button>
      {
        select.commentId === props.comment._id && 
        <NewComment
          title={'Новый ответ'}
          button={<button onClick={callbacks.closeText}>Отмена</button>} />
      }
    </div>)
}
