import React, {useCallback} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useSelector from "../../hooks/use-selector";
import {useParams} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import actionsComments from '../../store-redux/comments/actions';
import CommentList from "../../components/comment-list";
import Comment from "../../components/comment";
import CommentForm from "../../components/comment-form";
import Spinner from "../../components/spinner";

function Comments(){
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();

  const select = useSelector(state => ({
    user: state.session.user,
    token: state.session.token,
    exists: state.session.exists
  }))

  const selectRedux = useSelectorRedux(state => ({
    count: state.comments.count,
    comments: state.comments.data,
    waiting: state.comments.waiting
  }), shallowEqual);

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addComment: useCallback(async (token, body) => {
      await storeRedux.dispatch(actionsComments.addComment(token, body));
    }, [selectRedux.count, selectRedux.comments]),

    answerComment: useCallback(_id => storeRedux.dispatch(actionsComments.answerComment(_id)), []),
    closeComment: useCallback(_id => storeRedux.dispatch(actionsComments.closeComment(_id)), []),
    onHide: useCallback(_id => storeRedux.dispatch(actionsComments.onHide(_id)), []),
  };

  const rendersForm = {
    commentForm: useCallback((comment, _id, type) => (
      <CommentForm
        comment={comment}
        addComment={callbacks.addComment}
        closeComment={callbacks.closeComment}
        exists={select.exists}
        idParent={_id}
        typeParent={type}
        token={select.token}
      />
    ), [select.exists, selectRedux.comments]),
  }

  const renders = {
    itemComment: useCallback(item => (
      <Comment
        comment={item}
        user={select.user}
        idArticle={params.id}
        rendersForm={rendersForm.commentForm}
        answerComment={callbacks.answerComment}
        removeComment={callbacks.removeComment}
        onHide={callbacks.onHide}
      />
    ), [selectRedux.comments, select.exists]),
  }

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentList comments={selectRedux.comments}
                   count={selectRedux.count}
                   renderComment={renders.itemComment}
      />
    </Spinner>
  )
}

export default React.memo(Comments);
