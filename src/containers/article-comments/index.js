import React, { useCallback, useMemo, useState } from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import propTypes from "prop-types";
import { useParams } from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import actionsComments from "../../store-redux/comments/actions";
import CommentItem from "../../components/comments/comment-item";
import CommentsCounter from "../../components/comments/comments-counter";
import CommentForm from "../../components/comments/comment-form";
import CommentsList from "../../components/comments/comments-list";

function ArticleComments({ articleId }) {
  const store = useStore();
  const params = useParams();
  const storeRedux = useStoreRedux();

  const [replyIsOpen, setReplyIsOpen] = useState(false);

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      items: state.comments.items,
      count: state.comments.count,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  const authId = useSelector((state) => state.session.token);
  const { t } = useTranslate();

  const options = {
    comments: useMemo(
      () => treeToList(listToTree(select.items)),
      [select.items]
    ),
  };

  const callbacks = {
    sendNewComment: useCallback(
      async (authId, commentText, parentId, parentType) => {
        storeRedux.dispatch(
          actionsComments.post(authId, commentText, parentId, parentType)
        );
        setReplyIsOpen(false);
      },
      [select.comments]
    ),

    setReplyingComment: useCallback(
      (id) => {
        storeRedux.dispatch(actionsComments.replyToComment(id));
        setReplyIsOpen(true);
      },
      [replyIsOpen]
    ),

    stopReplyingComment: useCallback(() => {
      storeRedux.dispatch(actionsComments.stopReply());
      setReplyIsOpen(false);
    }, [replyIsOpen]),
  };

  const renderCommentForm = {
    commentForm: useCallback(
      (parentId, parentType) => (
        <CommentForm
          authId={authId}
          onSendNewComment={callbacks.sendNewComment}
          parentId={parentId}
          parentType={parentType}
          onCloseReply={callbacks.stopReplyingComment}
          t={t}
        />
      ),
      [authId, options.comments]
    ),
  };

  const renderComment = {
    comment: useCallback(
      (item) => (
        <CommentItem
          key={item._id}
          item={item}
          level={item.parent._tree?.length ?? 1}
          onReply={callbacks.setReplyingComment}
          renderReply={renderCommentForm.commentForm}
          replyIsOpen={replyIsOpen}
        />
      ),
      [options.comments]
    ),
  };

  return (
    <div>
      <Spinner active={select.waiting}>
        <CommentsCounter count={select.count} />
        <CommentsList
          comments={options.comments}
          renderComment={renderComment.comment}
          renderForm={renderCommentForm.commentForm}
          replyIsOpen={replyIsOpen}
          articleId={articleId}
        />
      </Spinner>
    </div>
  );
}

ArticleComments.propTypes = {
  articleId: propTypes.string.isRequired,
};

ArticleComments.defaultProps = {
  articleId: "",
};

export default React.memo(ArticleComments);
