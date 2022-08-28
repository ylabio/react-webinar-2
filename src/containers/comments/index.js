import React, { useCallback, useMemo, useState } from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import actionsComments from "../../store-redux/comments/actions";
import Spinner from "../../components/spinner";
import CommentsList from "../../components/comments-list";
import CommentForm from "../../components/comment-form";
import CommentHead from "../../components/comment-head";

function Comments({ parentId }) {
  const storeRedux = useStoreRedux();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslate();

  const [activeComment, setActiveComment] = useState(null);

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(parentId));
  }, [parentId]);

  const select = useSelectorRedux(
    (state) => ({
      count: state.comments.count,
      comments: state.comments.data,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );
  const selectStore = useSelector((state) => ({
    isAuth: state.session.exists,
  }));

  const options = {
    comments: useMemo(
      () => select.comments.filter((item) => item.parent._id === parentId),
      [select.comments]
    ),
  };

  const getReplies = (id) => {
    return select.comments.filter((item) => item.parent._id === id);
  };

  const callbacks = {
    onSubmit: useCallback((text, parentId, parentType) =>
      storeRedux.dispatch(actionsComments.post(text, parentId, parentType))
    ),
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentHead title={t("comments.title")} count={select.count} />
      <CommentsList
        comments={options.comments}
        getReplies={getReplies}
        isAuth={selectStore.isAuth}
        submit={callbacks.onSubmit}
        submitLabel={t("commentForm.submit")}
        canselLabel={t("commentForm.cansel")}
        activeComment={activeComment}
        setActiveComment={setActiveComment}
        parentId={parentId}
        onSignIn={callbacks.onSignIn}
      />
      {!activeComment && (
        <CommentForm
          id={parentId}
          type={"article"}
          submit={callbacks.onSubmit}
          submitLabel={t("commentForm.submit")}
          parentId={parentId}
          isAuth={selectStore.isAuth}
          onSignIn={callbacks.onSignIn}
        />
      )}
    </Spinner>
  );
}

Comments.propTypes = {
  parentId: propTypes.string.isRequired,
};

export default React.memo(Comments);
