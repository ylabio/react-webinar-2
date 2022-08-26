import React from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux} from 'react-redux';
import CommentsLayout from "../../components/comments/comments-layout";

function CommentsContainer() {

  const storeRedux = useStoreRedux();

  const select = useSelectorRedux(state => ({
    comments: state.comments,
    state: state,
    waiting: state.comments.waiting
  }));

  return (
    <CommentsLayout title={'Комментарии'} amount={0}>
      
    </CommentsLayout>
  );
}

export default React.memo(CommentsContainer);
