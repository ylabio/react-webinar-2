import React, { useState, useEffect, useCallback } from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
import actionsComments from "../../store-redux/comments/actions";
import useInit from "../../hooks/use-init";
import CommentList from "../../components/comment-list";
import CommentItem from "../../components/comment-item";
import TextArea from "../../components/textarea";
import { sortComments } from "../../utils/sort";

function CommentsContainer({ id }) {
  const storeRedux = useStoreRedux();

  const select = useSelectorRedux(
    (state) => ({
      comments: state.comments.data.items,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(id));
  }, [id]);

  const [state, setState] = useState([]);
  const [area, setArea] = useState(0);

  useEffect(() => {
    select.comments && setState(sortComments(select.comments));
  }, [select.comments]);

  const callbacks = {
    // Открытие корзины
    newComment: useCallback((text, parent_id, parentType) => {
      storeRedux.dispatch(
        actionsComments.newComment(text, parent_id, parentType)
      );
    }, []),
  };

  console.log("comments", state);

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
                  <TextArea
                    head={"Ответить"}
                    setArea={() => setArea(0)}
                    parent={item}
                    newComment={() =>
                      callbacks.newComment("12345", item._id, "comment")
                    }
                  />
                )}
              </div>
            );
          })}
          {area === 0 && (
            <TextArea
              head={"Новый комментарий"}
              parent={id}
              newComment={() => callbacks.newComment("12345", id, "article")}
            />
          )}
        </CommentList>
      )}
    </div>
  );
}

export default React.memo(CommentsContainer);
