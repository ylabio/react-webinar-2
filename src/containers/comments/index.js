import React, {useState, useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import {useStore as useStoreRedux, useSelector as useSelectorRedux} from 'react-redux';
import actionsComments from "../../store-redux/comments/actions";
import CommentsLayout from "../../components/comments/comments-layout";
import CommentAdding from "../../components/comments/comment-adding";

function CommentsContainer() {
  const storeRedux = useStoreRedux();

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const reduxSelect = useSelectorRedux(state => ({
    comments: state.comments,
    articleId: state.article.data._id,
    waiting: state.comments.waiting,
  }));

  const [message, setMessage] = useState('');

  const callbacks = {
    onChange: useCallback((value) => {
      setMessage(value);
    }, []),
  
    onSubmit: useCallback((evt) => {
      evt.preventDefault();
      storeRedux.dispatch(actionsComments.send({text: message, parent: {_id: reduxSelect.articleId, _type: "article"}}));
    }, [message, reduxSelect.articleId])
  };

  return (
    <CommentsLayout title={'Комментарии'} amount={0}>
      <CommentAdding isAuth={select.exists} message={message}
        handleSubmit={callbacks.onSubmit} handleChange={callbacks.onChange} />
    </CommentsLayout>
  );
}

export default React.memo(CommentsContainer);
