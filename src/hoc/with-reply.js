import React, { useCallback } from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import NewComment from "../components/new-comment";
import actionsComments from '../store-redux/comments/actions';
import {useParams} from "react-router-dom";
import useSelector from "../hooks/use-selector";
import UnloginText from "../components/unlogin-text";
import { useNavigate, useLocation } from "react-router-dom";

export const withReply = (Component) => (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const storeRedux = useStoreRedux();

  const exists = useSelector(state => state.session.exists);

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

    onSend: useCallback((data) => {
      storeRedux.dispatch(actionsComments.send(data, props.comment._id, 'comment'));
      callbacks.closeText();
      storeRedux.dispatch(actionsComments.load(params.id));
    }, []),

    redirect: useCallback(() => {
      navigate('/login', {state: { back: location.pathname }});
    })
  }

  return (
    <div className='Comment-wrap'>
      <Component {...props} />
      <button className='Comment-button' onClick={callbacks.openText}>Ответить</button>
      {
        exists ?
          select.commentId === props.comment._id && 
            <NewComment title={'Новый ответ'} send={callbacks.onSend}>
              <button type="button" onClick={callbacks.closeText}>Отмена</button>
            </NewComment>
            :
          select.commentId === props.comment._id &&
            <UnloginText text={'ответить.'} redirect={callbacks.redirect}>
              <span className="UnloginText-out" onClick={callbacks.closeText}>Отмена</span>
            </UnloginText>
      }
    </div>)
}
