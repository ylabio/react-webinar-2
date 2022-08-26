import React, {useCallback, useState} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Item from "../../components/item";
import CommentsBlock from "../../components/comments/comments-block";
import actionsComments from '../../store-redux/comments/actions';
import Comment from "../../components/comments/comment";


function CommentContainer(props) {

  const [comment, setComment] = useState('');
	
  const storeRedux = useStoreRedux();

  // const select = useSelectorRedux(state => ({
	// 	comments: state.comments.data
  // }));

  const {t} = useTranslate();

  const callbacks = {
		// Добавление комментария
    addComment: useCallback(() => {
      const newcomment = {text: comment, parent: props.article}
      storeRedux.dispatch(actionsComments.add(newcomment));
			setComment('')
    }, []),
  };

  return (
      <CommentsBlock items={props.comments} onChange={setComment} addComment={callbacks.addComment}/>
  );
}

export default React.memo(CommentContainer);
