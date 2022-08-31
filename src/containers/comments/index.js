import React, {useState, useCallback, useEffect, useRef} from "react";
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
  const [message, setMessage] = useState('');
  const [activeCommentId, setActiveCommentId] = useState(null);
  const newCommentItem = useRef(null);
  
  const storeRedux = useStoreRedux();
  const navigate = useNavigate();
  const location = useLocation();
  let newComment = document.querySelector('.CommentItem_new');
  let offsetY = 0;
  const formType = activeCommentId ? 'comment' : 'article';
  
  useEffect(() => {
    // скролл к новому комменту
    newComment = newCommentItem.current;
    offsetY = newComment?.getBoundingClientRect().y + window.pageYOffset;
    if (offsetY) {
      window.scrollTo({top: offsetY - window.innerHeight / 2, behavior: "smooth"});
    }
  }, [])
  
  const select = useSelector(state => ({
    exists: state.session.exists,
  }));
  
  const reduxSelect = useSelectorRedux(state => ({
    comments: state.comments.data,
    articleId: state.article.data._id,
    waiting: state.comments.waiting,
    newCommentId: state.comments.newCommentId,
  }));

  const callbacks = {
    onSetActive: useCallback((id) => {
      setActiveCommentId(id);
    }, []),

    onMessageChange: useCallback((value) => {
      setMessage(value);
    }, []),

    onCommentsEnter: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  
    onSubmit: useCallback(async (evt) => {
      evt.preventDefault();
      const data = {text: message, parent: {_id: activeCommentId || reduxSelect.articleId, _type: formType}}
      storeRedux.dispatch(actionsComments.send(data));
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
      <CommentsList items={newItems} isAuth={select.exists} newCommentItem={newCommentItem}
        activeCommentId={activeCommentId} newCommentId={reduxSelect.newCommentId}
        handleSubmit={callbacks.onSubmit} handleChange={callbacks.onMessageChange}
        handleActive={callbacks.onSetActive} handleEnter={callbacks.onCommentsEnter}
      />
      {formType === 'article' &&
        <CommentAdding isAuth={select.exists} message={message} formType={'article'} handleSubmit={callbacks.onSubmit}
          handleChange={callbacks.onMessageChange} handleEnter={callbacks.onCommentsEnter}
        />
      }
    </CommentsLayout>
  );
}

export default React.memo(CommentsContainer);
