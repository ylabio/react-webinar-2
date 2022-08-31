import React, { useCallback, useMemo, useState } from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import propTypes from "prop-types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import nestLimiter from "../../utils/nest-limiter";
import dateFormatter from "../../utils/date-formatter";

function ArticleComments({ articleId }) {
  const store = useStore();
  const params = useParams();
  const storeRedux = useStoreRedux();
  const location = useLocation();
  const navigate = useNavigate();

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
  const lang = useSelector((state) => state.locale.lang);

  const { t } = useTranslate();

  const options = {
    comments: useMemo(
      () => treeToList(listToTree(select.items, "article")),
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
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
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
          onSignIn={callbacks.onSignIn}
          t={t}
        />
      ),
      [authId, options.comments, lang]
    ),
  };

  const renderComment = {
    comment: useCallback(
      (item) => (
        <CommentItem
          key={item._id}
          item={item}
          date={dateFormatter(item.dateCreate, lang)}
          level={nestLimiter(item.parent._tree?.length) ?? 1}
          onReply={callbacks.setReplyingComment}
          renderReply={renderCommentForm.commentForm}
          replyIsOpen={replyIsOpen}
          t={t}
        />
      ),
      [options.comments, lang, authId]
    ),
  };

  return (
    <div>
      <Spinner active={select.waiting}>
        <CommentsCounter count={select.count} t={t} />
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
