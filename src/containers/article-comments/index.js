import React, { useCallback, useMemo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from 'react-redux';
import useInit from '../../hooks/use-init';
import actionsComments from '../../store-redux/comments/actions';
import dateFormat from '../../utils/date-format';
import Spinner from '../../components/spinner';
import Comment from '../../components/comment';
import CheckAuthComment from '../check-auth-comment';
import TotalComments from '../../components/total-comments';

function ArticleComments({ id }) {
  const storeRedux = useStoreRedux();

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(id));
  }, [id]);

  const selectRedux = useSelectorRedux(
    state => ({
      comments: state.comments.items,
      count: state.comments.count,
      waiting: state.comments.waiting,
      replyStatus: state.comments.replyStatus,
    }),
    shallowEqual
  );

  const { t } = useTranslate();

  const options = {
    comments: useMemo(
      () => [
        ...treeToList(listToTree(selectRedux.comments), (item, level) => ({
          ...item,      
          level,
          dateCreate: dateFormat(item.dateCreate),
        })),
      ],
      [selectRedux.comments]
    ),
  };

  const callbacks = {
    onReplyClick: useCallback(
      id => {
        storeRedux.dispatch(actionsComments.showReply(id));
      },
      [selectRedux.replyStatus]
    ),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <>
        <TotalComments title={t('comments.title')} count={selectRedux.count} />
        {options.comments.map(item => (
          <Comment
            comment={item}
            buttonText={t('comment.reply')}
            onClick={callbacks.onReplyClick}
            key={item._id}
          >
            {selectRedux.replyStatus === item._id ? (
              <CheckAuthComment
                parentId={item._id}
                parentType={item._type}
                isDefault={false}
              />
            ) : (
              ''
            )}
          </Comment>
        ))}
        {!selectRedux.replyStatus ? (
          <CheckAuthComment parentId={id} parentType={'article'} isDefault={true} />
        ) : null}
      </>
    </Spinner>
  );
}

export default React.memo(ArticleComments);
