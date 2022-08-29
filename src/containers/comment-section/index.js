import React, { useMemo, useCallback } from 'react';
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from 'react-redux';
import { useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import actionsComment from '../../store-redux/comments/actions';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import Spinner from '../../components/spinner';
import ListComment from '../../components/comments/list-comment';
import ItemComment from '../../components/comments/item-comment';
import CountComment from '../../components/comments/count-comment';
import { makeDate } from '../../utils/make-date';
import { makeIndentation } from '../../utils/make-indentation';
import WindowComment from '../comment-window';

function ArticleCommentSection() {
  const storeRedux = useStoreRedux();
  const params = useParams();

  useInit(async () => {
    storeRedux.dispatch(actionsComment.load(params.id));
  }, [params.id]);

  const selectRedux = useSelectorRedux(
    (state) => ({
      comments: state.comments.comments,
      count: state.comments.count,
      waiting: state.comments.loadWaiting,
      isReplying: state.comments.isReplying,
    }),
    shallowEqual
  );

  const callbacks = {
    onReply: useCallback((id) => {
      storeRedux.dispatch(actionsComment.reply(id));
    }),
  };

  const options = {
    comments: useMemo(
      () => [
        ...treeToList(listToTree(selectRedux.comments), (item, level) => ({
          ...item,
          indentation: makeIndentation(level),
          date: makeDate(item.dateCreate),
        })),
      ],
      [selectRedux.comments]
    ),
  };

  const renders = {
    itemComment: useCallback(
      (comment) => (
        <ItemComment
          comment={comment}
          key={comment._id}
          onReply={callbacks.onReply}>
          {selectRedux.isReplying === comment._id ? (
            <WindowComment parentId={comment._id} parentType={comment._type} />
          ) : (
            ''
          )}
        </ItemComment>
      ),
      [selectRedux.isReplying]
    ),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <CountComment count={selectRedux.count} />
      <ListComment items={options.comments} renderItem={renders.itemComment} />
      {!selectRedux.isReplying ? (
        <WindowComment parentId={params.id} parentType={'article'} />
      ) : null}
    </Spinner>
  );
}

export default React.memo(ArticleCommentSection);
