import React, {useCallback, useState} from 'react';
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
} from 'react-redux';
import listToTree from '../../utils/list-to-tree'
import treeToList from '../../utils/tree-to-list'
import useTranslate from '../../hooks/use-translate';
import useSelector from "../../hooks/use-selector";
import CommentsBlock from '../../components/comments/comments-block';
import actionsComments from '../../store-redux/comments/actions';

function CommentContainer(props) {
  const [comment, setComment] = useState('');

  const storeRedux = useStoreRedux();

  const selectRedux = useSelectorRedux((state) => ({
    comments: state.comments.data,
    commentsCount: state.comments.count,
    article: state.article.data,
  }));
  const select = useSelector((state) => ({
    exists: state.session.exists,
  }));
  const formedList = listToTree(selectRedux.comments)

  const {t} = useTranslate();

  const callbacks = {
    // Добавление комментария
    addComment: useCallback(() => {
      const newcomment = {text: comment, parent: props.article};
      storeRedux.dispatch(actionsComments.add(newcomment));
      setComment('');
    }, []),
  };

  return (
    <CommentsBlock  exists={select.exists} items={formedList} count={selectRedux.commentsCount} onChange={setComment} addComment={callbacks.addComment}/>
  );
}

export default React.memo(CommentContainer);
