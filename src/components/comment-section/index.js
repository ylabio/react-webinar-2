import React, { useCallback, useState } from "react";
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
import actionsComments from "../../store-redux/comments/actions";

function CommentSection({ isLoggedIn, articleId }) {
  const [currentTargetId, setCurrentTargetId] = useState(articleId);
  console.log(currentTargetId);
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

  const callbacks = {
    createComment: useCallback(
      async ({ text, parent_id, parent_type }) => {
        storeRedux.dispatch(
          actionsComments.create(
            {
              text,
              parent: { _id: parent_id, _type: parent_type },
            },
            articleId,
            current_user.profile.name,
            () => {
              setCurrentTargetId(articleId);
            }
          )
        );
      },
      [current_user, articleId]
    ),
    currentTargetIsComment: useCallback(() => {
      setCurrentTargetId(articleId);
    }, []),
    currentTargetIsReply: useCallback((reply_id) => {
      setCurrentTargetId(reply_id);
    }, []),
  };

  const cn = bem("CommentSection");

  const comments = commentsSlice.list.map((item) => (
    <Comment
      item={item}
      key={item._id}
      isLoggedIn={isLoggedIn}
      onReply={callbacks.createComment}
      level={1}
      currentTargetId={currentTargetId}
      currentTargetIsComment={callbacks.currentTargetIsComment}
      currentTargetIsReply={callbacks.currentTargetIsReply}
    />
  ));

  return !commentsSlice.waiting ? (
    <div className={cn()}>
      <h2 className={cn("header")}>Комментарии ({commentsSlice.count})</h2>
      {!!commentsSlice.list.length && comments}
      <CommentCreate
        onCreate={callbacks.createComment}
        articleId={articleId}
        isLoggedIn={isLoggedIn}
        currentTargetId={currentTargetId}
      />
    </div>
  ) : (
    <></>
  );
}

export default CommentSection;
