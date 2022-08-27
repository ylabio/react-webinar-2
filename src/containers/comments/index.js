import React, {useState, useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import {useStore as useStoreRedux, useSelector as useSelectorRedux} from 'react-redux';
import {useLocation, useNavigate} from "react-router-dom";
import actionsComments from "../../store-redux/comments/actions";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import CommentsLayout from "../../components/comments/comments-layout";
import CommentsList from "../../components/comments/comments-list";
import CommentAdding from "../../components/comments/comment-adding";

function CommentsContainer() {
  const storeRedux = useStoreRedux();
  const navigate = useNavigate();
  const location = useLocation();
  
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

    onMessageChange: useCallback((value) => {
      setMessage(value);
    }, []),

    onCommentsEnter: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  
    onSubmit: useCallback(async (evt) => {
      evt.preventDefault();
      const data = {text: message, parent: {_id: activeCommentId || reduxSelect.articleId, _type: target}}
      await storeRedux.dispatch(actionsComments.send(data));
      storeRedux.dispatch(actionsComments.load(reduxSelect.articleId));
    }, [message, reduxSelect.articleId])
  };

  let tree = [];
  let newItems = [];
  if (reduxSelect.comments && reduxSelect.articleId) {
    tree = listToTree(reduxSelect.comments, reduxSelect.articleId);
    newItems = treeToList(tree, (item, level) => Object.assign(item, {level: level}));
  }

  return (
    <CommentsLayout title={'Комментарии'} amount={reduxSelect.comments?.length}>
      <CommentsList items={newItems} target={target} isAuth={select.exists}
        activeCommentId={activeCommentId} handleTarget={callbacks.onTargetChange}
        handleSubmit={callbacks.onSubmit} handleChange={callbacks.onMessageChange}
        handleCancel={callbacks.onTargetChange} handleActive={callbacks.onSetActive}
        handleEnter={callbacks.onCommentsEnter}
      />
      {target === 'article' &&
        <CommentAdding isAuth={select.exists} message={message} target={target} handleSubmit={callbacks.onSubmit}
          handleChange={callbacks.onMessageChange} handleEnter={callbacks.onCommentsEnter}
        />
      }
    </CommentsLayout>
  );
}

export default React.memo(CommentsContainer);
