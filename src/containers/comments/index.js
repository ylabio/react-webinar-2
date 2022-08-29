import React, { useState, useEffect, useCallback } from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
import actionsComments from "../../store-redux/comments/actions";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import CommentList from "../../components/comment-list";
import CommentItem from "../../components/comment-item";
import TextArea from "../../components/textarea";
import CommentLogin from "../../components/comment-login";
import { sortComments } from "../../utils/sort";

function CommentsContainer({ id }) {
  const storeRedux = useStoreRedux();

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(id));
  }, [id]);

  const select = useSelectorRedux(
    (state) => ({
      comments: state.comments.data.items,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  console.log("comments", select.comments);

  const session = useSelector((state) => state.session.exists);

  const [state, setState] = useState([]);
  const [area, setArea] = useState(0);

  useEffect(() => {
    select.comments && setState(sortComments(select.comments));
  }, [select.comments]);

  const callbacks = {
    newComment: useCallback((text, parent_id, parentType) => {
      storeRedux.dispatch(
        actionsComments.newComment(text, parent_id, parentType)
      );
    }, []),
  };

  const btnNewComment = (
    <input type="button" value="Отмена" onClick={() => setArea(0)} />
  );

  console.log("state", state);

  return (
    <div>
      {state && (
        <CommentList all={state.length}>
          {state.map((item, index) => {
            return (
              <div
                key={index + 1}
                style={{
                  paddingLeft: `${(item.parent._tree.length - 1) * 20}px`,
                }}
              >
                <CommentItem item={item} setArea={() => setArea(index + 1)} />
                {area === index + 1 && (
                  <CommentLogin log={session} btnNewComment={btnNewComment}>
                    <TextArea
                      head={"Ответить"}
                      btnNewComment={btnNewComment}
                      parent={item._id}
                      newComment={callbacks.newComment}
                    />
                  </CommentLogin>
                )}
              </div>
            );
          })}
          {area === 0 && (
            <CommentLogin log={session}>
              <TextArea
                head={"Новый комментарий"}
                parent={id}
                newComment={callbacks.newComment}
              />
            </CommentLogin>
          )}
        </CommentList>
      )}
    </div>
  );
}

export default React.memo(CommentsContainer);
