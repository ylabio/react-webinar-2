import React, { useCallback, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Title from "../../components/title";
import Spacing from "../../components/spacing";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import List from "../../components/list";
import ItemComment from "../../components/item-comment";
import Reply from "../../components/reply";
import * as actionsComments from "../../store-redux/comments/actions";
import ProtectedItem from "../protected-item";
import ProtectedItemComment from "../../components/protected-item-comment";
import dateFormat from "../../utils/date-format";

function CommentsContainer() {
  const location = useLocation();
  const params = useParams();
  const rootId = params.id;

  const storeRedux = useStoreRedux();

  const select = useSelectorRedux(
    (state) => ({
      items: state.comments.items,
      count: state.comments.count,
      replyId: state.comments.replyId,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  const { t } = useTranslate();

  const callbacks = {
    selectReplyId: useCallback(
      (_id) => storeRedux.dispatch(actionsComments.selectReplyId(_id)),
      []
    ),
    resetReplyId: useCallback(
      () => storeRedux.dispatch(actionsComments.resetReplyId()),
      []
    ),
    post: useCallback(
      (parentId, type, text) =>
        storeRedux.dispatch(actionsComments.post(rootId, parentId, type, text)),
      []
    ),
  };

  const options = {
    comments: useMemo(
      () => treeToList(listToTree(select.items, rootId)),
      [select.items]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <ItemComment
          author={item.author.profile.name}
          date={dateFormat(item.dateCreate)}
          text={item.text}
          lvl={(item.parent._tree?.length > 5 ? 5 : item.parent._tree?.length) - 1 || 0}
          labelReply={t("comment.reply")}
          selectReplyId={() => callbacks.selectReplyId(item._id)}
          replyComponent={
            item._id === select.replyId && (
              <ProtectedItem
                noexist={
                  <ProtectedItemComment
                    linkState={{ back: location.pathname }}
                    onCancel={callbacks.resetReplyId}
                  />
                }
              >
                <Reply
                  _id={item._id}
                  type={item._type}
                  post={callbacks.post}
                  resetReplyId={callbacks.resetReplyId}
                  t={t}
                />
              </ProtectedItem>
            )
          }
        />
      ),
      [t, select.replyId]
    ),
  };

  return (
    <Spinner active={select.waiting}>
      <Spacing mode="content">
        <Title>Комментарии ({select.count})</Title>
        <List
          items={options.comments}
          renderItem={renders.item}
          mode="comments"
        />
        {!select.replyId && (
          <ProtectedItem
            noexist={
              <ProtectedItemComment linkState={{ back: location.pathname }} />
            }
          >
            <Reply
              _id={rootId}
              type="article"
              mode="new"
              post={callbacks.post}
              t={t}
            />
          </ProtectedItem>
        )}
      </Spacing>
    </Spinner>
  );
}

export default React.memo(CommentsContainer);
