import React, { useCallback, useState, useEffect } from "react";
import { useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual } from "react-redux";
import useSelector from "../../hooks/use-selector";
import { useParams } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import actionsComments from '../../store-redux/comments/actions';
import CommentList from "../../components/comment-list";
import Comment from "../../components/comment";
import CommentForm from "../../components/comment-form";
import Spinner from "../../components/spinner";
import CommentMainForm from "../../components/comment-main-form";

function Comments() {
  // Параметры из пути /articles/:id
  const params = useParams();
  const storeRedux = useStoreRedux();

  const [form, setForm] = useState(true);

  const select = useSelector(state => ({
    user: state.session.user,
    token: state.session.token,
    exists: state.session.exists
  }))

  const selectRedux = useSelectorRedux(state => ({
    count: state.comments.count,
    comments: state.comments.data,
    waiting: state.comments.waiting,
    comment: state.comments.comment,
  }), shallowEqual);

  useEffect(() => {
    const item = document.getElementById(selectRedux.comment);

    if (item && (window.innerHeight + window.scrollY) < item.offsetTop) {
      item.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [selectRedux.comment]);

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addComment: useCallback(async (token, body) => {
      await storeRedux.dispatch(actionsComments.addComment(token, body));
      setForm(true);
    }, [selectRedux.comments, selectRedux.comment]),

    answerComment: useCallback(_id => {
      storeRedux.dispatch(actionsComments.answerComment(_id));
      setForm(false);
    }, []),
    closeComment: useCallback(_id => {
      storeRedux.dispatch(actionsComments.closeComment(_id));
      setForm(true);
    }, []),
  };

  const rendersForm = {
    commentForm: useCallback((commentId) => (
      <CommentForm
        commentId={commentId}
        addComment={callbacks.addComment}
        closeComment={callbacks.closeComment}
        exists={select.exists}
        token={select.token}
        t={t}
      />
    ), [selectRedux.comments, select.exists, t]),
  }

  const renders = {
    itemComment: useCallback(item => (
      <Comment
        comment={item}
        userId={select.user._id}
        rendersForm={rendersForm.commentForm}
        answerComment={callbacks.answerComment}
        t={t}
      />
    ), [selectRedux.comments, t]),
  }

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentList comments={selectRedux.comments}
        count={selectRedux.count}
        renderComment={renders.itemComment}
        t={t}
      />
      {form && <CommentMainForm addComment={callbacks.addComment}
        exists={select.exists}
        articleId={params.id}
        token={select.token}
        t={t} />}
    </Spinner>
  )
}

export default React.memo(Comments);
