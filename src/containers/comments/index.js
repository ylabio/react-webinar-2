import React, {useState, useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import {useStore as useStoreRedux, useSelector as useSelectorRedux} from 'react-redux';
import actionsComments from "../../store-redux/comments/actions";
import CommentsLayout from "../../components/comments/comments-layout";
import CommentsList from "../../components/comments/comments-list";
import CommentAdding from "../../components/comments/comment-adding";

function CommentsContainer() {
  const storeRedux = useStoreRedux();
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('article');
  const [activeCommentId, setActiveCommentId] = useState(null);
  const select = useSelector(state => ({
    exists: state.session.exists,
  }));
  
  const reduxSelect = useSelectorRedux(state => ({
    comments: state.comments.data.items,
    articleId: state.article.data._id,
    waiting: state.comments.waiting,
  }));

  const callbacks = {
    onSetActive: useCallback((id) => {
      setActiveCommentId(id);
    }, []),

    onTargetChange: useCallback((value) => {
      setTarget(value);
    }, []),

    onChange: useCallback((value) => {
      setMessage(value);
    }, []),
  
    onSubmit: useCallback(async (evt) => {
      evt.preventDefault();
      const data = {text: message, parent: {_id: activeCommentId || reduxSelect.articleId, _type: target}}
      await storeRedux.dispatch(actionsComments.send(data));
      storeRedux.dispatch(actionsComments.load(reduxSelect.articleId));
    }, [message, reduxSelect.articleId])
  };

  return (
    <CommentsLayout title={'Комментарии'} amount={reduxSelect.comments?.length}>
      <CommentsList items={reduxSelect.comments} target={target} isAuth={select.exists}
        activeCommentId={activeCommentId} handleTarget={callbacks.onTargetChange}
        handleSubmit={callbacks.onSubmit} handleChange={callbacks.onChange}
        handleCancel={callbacks.onTargetChange} handleActive={callbacks.onSetActive}
      />
      {target === 'article' &&
      <CommentAdding isAuth={select.exists} message={message} target={target}
        handleSubmit={callbacks.onSubmit} handleChange={callbacks.onChange}
      />
      }
    </CommentsLayout>
  );
}

export default React.memo(CommentsContainer);
