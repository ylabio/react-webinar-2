import React, {useCallback} from 'react';
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
} from 'react-redux';
import {useLocation, useNavigate} from "react-router-dom";
import listToTree from '../../utils/list-to-tree'
import useSelector from "../../hooks/use-selector";
import CommentsBlock from '../../components/comments/comments-block';
import actionsComments from '../../store-redux/comments/actions';

function CommentContainer(props) {

  const storeRedux = useStoreRedux();
  const navigate = useNavigate();
  const location = useLocation();

  const selectRedux = useSelectorRedux((state) => ({
    comments: state.comments.data,
    commentsCount: state.comments.count,
    article: state.article.data,
    answerState: state.comments.answeringComment,
  }));

  const select = useSelector((state) => ({
    exists: state.session.exists,
  }));
  const formedList = listToTree(selectRedux.comments)

  const callbacks = {
    openAnswerBlock: useCallback((id)=>{
      storeRedux.dispatch(actionsComments.openAnswer(id))
    }),
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
    // Добавление комментария
    addComment: useCallback((text, parent = {_id: props.article, _type: 'article'}) => {
      const newcomment = {text, parent, parentArticleId:props.article};
      storeRedux.dispatch(actionsComments.add(newcomment));
    }, []),
  };

  return (
    <CommentsBlock
      exists={select.exists} 
      items={formedList} 
      count={selectRedux.commentsCount} 
      addComment={callbacks.addComment}
      openAnswerBlock={callbacks.openAnswerBlock}
      answerState={selectRedux.answerState}
      signIn={callbacks.onSignIn}
      />

  );
}

export default React.memo(CommentContainer);
