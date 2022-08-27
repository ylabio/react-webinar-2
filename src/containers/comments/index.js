import React from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
import actionsComments from "../../store-redux/comments/actions";
import useInit from "../../hooks/use-init";

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
    //await store.get('article').load(params.id);
    storeRedux.dispatch(actionsComments.load(id));
  }, [id]);

  return (
    <div>{select.comments && select.comments.map((item) => item.text)}</div>
  );
}

export default React.memo(CommentsContainer);
