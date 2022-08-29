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
  const [activeCommentId, setActiveCommentId] = useState(null);

  const formType = activeCommentId ? 'comment' : 'article';
  
  const select = useSelector(state => ({
    exists: state.session.exists,
  }));
  
  const reduxSelect = useSelectorRedux(state => ({
    comments: state.comments.data.items,
    articleId: state.article.data._id,
    waiting: state.comments.waiting,
  }));

  // Отправляет новый комментарий и выполняет загрузку всех комментариев
  function sendAndLoadComments(data, id) {
    return function(dispatch) {
      dispatch(actionsComments.send(data));
      dispatch(actionsComments.load(id));
    }
  }

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
      storeRedux.dispatch(sendAndLoadComments(data, reduxSelect.articleId));
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
      <CommentsList items={newItems} isAuth={select.exists} activeCommentId={activeCommentId}
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
