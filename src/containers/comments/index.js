import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
import propTypes from "prop-types";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import actionsComments from "../../store-redux/comments/actions";
import Spinner from "../../components/spinner";
import CommentsList from "../../components/comments-list";
import ItemComment from "../../components/item-comment";
import CommentForm from "../../components/comment-form";

function Comments({ parentId }) {
  const storeRedux = useStoreRedux();
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
  };

  return (
    <Spinner active={select.waiting}>
      <h2>
        {t("comments.title")}({select.count})
      </h2>
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
      />
      {!activeComment && (
        <CommentForm
          id={parentId}
          type={"article"}
          submit={callbacks.onSubmit}
          submitLabel={t("commentForm.submit")}
          parentId={parentId}
          isAuth={selectStore.isAuth}
        />
      )}
    </Spinner>
  );
}

Comments.propTypes = {
  parentId: propTypes.string.isRequired,
};

export default React.memo(Comments);
