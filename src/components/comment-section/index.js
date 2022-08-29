import React, { useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import "./style.css";
import Comment from "../comment";
import CommentCreate from "../comment-create";
import { Link } from "react-router-dom";
import actionsComments from "../../store-redux/comments/actions";

function CommentSection({ isLoggedIn, articleId }) {
  const storeRedux = useStoreRedux();
  const current_user = useSelector((state) => state.session.user);

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(articleId));
  }, [articleId]);

  const commentsSlice = useSelectorRedux(
    (state) => ({
      list: state.comments.data,
      count: state.comments.count,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  const createComment = useCallback(
    async ({ text, parent_id, parent_type }) => {
      storeRedux.dispatch(
        actionsComments.create(
          {
            text,
            parent: { _id: parent_id, _type: parent_type },
          },
          articleId,
          current_user.profile.name
        )
      );
    },
    [current_user, articleId]
  );

  const cn = bem("CommentSection");

  const comments = commentsSlice.list.map((item) => (
    <Comment
      item={item}
      key={item._id}
      isLoggedIn={isLoggedIn}
      onReply={createComment}
    />
  ));
  const create_comment_form = isLoggedIn ? (
    <CommentCreate onCreate={createComment} articleId={articleId} />
  ) : (
    <div style={{ marginTop: "30px" }}>
      <Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать
    </div>
  );

  return !commentsSlice.waiting ? (
    <div className={cn()}>
      <h2 className={cn("header")}>Комментарии ({commentsSlice.count})</h2>
      {!!commentsSlice.list.length && comments}
      {create_comment_form}
    </div>
  ) : (
    <></>
  );
}

export default CommentSection;
