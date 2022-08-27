import React, { useState, useEffect } from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
import actionsComments from "../../store-redux/comments/actions";
import useInit from "../../hooks/use-init";
import CommentList from "../../components/comment-list";
import positions from "../../utils/positions";

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

  useEffect(() => {
    let pos =
      select.comments &&
      select.comments.map((item, index, array) => {
        return { ...item, position: positions(item, array, id) };
      });

    setState(pos);
  }, [select.comments]);

  return <div>{state && <CommentList comments={state} />}</div>;
}

export default React.memo(CommentsContainer);
