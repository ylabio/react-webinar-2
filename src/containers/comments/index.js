import React, {useCallback, useMemo, useState} from 'react';
import {shallowEqual, useSelector as useSelectorRedux, useStore as useStoreRedux} from "react-redux";
import useSelector from "../../hooks/use-selector";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import actionsComments from "../../store-redux/comments/actions";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import CommentsList from "../../components/comments-list";
import Comment from "../../components/comment";
import CommentForm from "../../components/comment-form";


function Comments() {
  const
    storeRedux = useStoreRedux(),
    navigate = useNavigate(),
    location = useLocation(),
    params = useParams();

  const [answerId, setAnswerId] = useState(params.id);
  const [answerType, setAnswerType] = useState('article');

  const select = useSelectorRedux(state => ({
    commentsCount: state.comments.count,
    comments: state.comments.items,
  }), shallowEqual);

  const secondSelect = useSelector(state => ({
    sessionExists: state.session.exists,
    token: state.session.token,
    language: state.locale.lang
  }));

  const options = {
    comments: useMemo(() => {
      return treeToList(listToTree(select.comments), ((item, level) => (
        {
          level,
          id: item._id,
          text: item.text,
          author: item.author.profile.name,
          nestingLevel: level,
          date: item.dateCreate,
        }
      )))
    }, [select.comments]),
  }

  const callbacks = {
    // место публикации комментария
    changePlace: useCallback(id => {
      setAnswerId(id)
      setAnswerType('comment')
    }, []),
    resetPlace: useCallback(() => {
      setAnswerId(params.id)
      setAnswerType('article')
    }, [params.id]),

    // Отправка нового комментария
    createComment: useCallback((text) => {
      storeRedux.dispatch(actionsComments.createComment(text, answerId, answerType, secondSelect.token, params.id))
    }, [answerId, answerType, secondSelect.token, params.id]),
    redirect: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  };

  const renders = {
    comment: useCallback((item) => (
      <Comment
        key={item.id}
        item={item}
        current={answerId}
        changePlace={callbacks.changePlace}
        createComment={callbacks.createComment}
        resetPlace={callbacks.resetPlace}
        redirect={callbacks.redirect}
        sessionExists={secondSelect.sessionExists}
      >
        {answerId === item.id ? <CommentForm
          item={true}
          current={answerId}
          resetPlace={callbacks.resetPlace}
          createComment={callbacks.createComment}
          redirect={callbacks.redirect}
          sessionExists={secondSelect.sessionExists}
        /> : null}
      </Comment>
    ), [answerId, callbacks.createComment, callbacks.resetPlace, secondSelect.sessionExists, secondSelect.language]),
  }
  return (
    <CommentsList
      commentsCount={select.commentsCount}
      comments={options.comments}
      comment={renders.comment}
      current={answerId}
    >
      {params.id === answerId ? <CommentForm
        item={false}
        current={answerId}
        resetPlace={callbacks.resetPlace}
        createComment={callbacks.createComment}
        redirect={callbacks.redirect}
        sessionExists={secondSelect.sessionExists}
      /> : null}
    </CommentsList>
  )
}

export default React.memo(Comments);