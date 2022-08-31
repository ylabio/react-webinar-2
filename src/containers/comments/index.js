import React, {useCallback, useMemo} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import {useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import actionsComments from '../../store-redux/comments/actions';
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import Comment from "../../components/comment";
import createDate from "../../utils/create-date";
import CommentCount from "../../components/comment-count";
import Loading from "../../components/loading";
import UserComment from "../user-comment";

function Comments(){
  const params = useParams();
  const storeRedux = useStoreRedux();
  const {t, lang} = useTranslate();

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(state => ({
    comments: state.comments.items,
    count:  state.comments.count,
    replyOpenStatus:  state.comments.replyOpenStatus,
    waiting: state.comments.waiting,
  }), shallowEqual);

  const data = {
    comments: useMemo(() => [
      ...treeToList(
      listToTree(select.comments),
      (item, level) => ({
        ...item,
        padding: 30 * level > 600 ? 600 : 30 * level,
        dateCreate: createDate(item.dateCreate, lang)
      }))
    ], [select.comments, lang]),
  }

  const callbacks = {
    onReplyClick: useCallback((id) => {
      storeRedux.dispatch(actionsComments.replyOpen(id));
    }, [select.replyOpenStatus]),
  };

  return (
  <Spinner active={select.waiting}>
    {select.waiting ? <Loading text={t('comments.loading')}/> :
    <>
      <CommentCount title={t('comments.title')} count={select.count} />
      {data.comments.map((item) =>
        <Comment comment={item} buttonText={t('comment.reply')} onClick={callbacks.onReplyClick} key={item._id}>
          {select.replyOpenStatus === item._id ? <UserComment parentId={item._id} parentType={item._type} isDefault={false}/> : ''}
        </Comment>
      )}
      {!select.replyOpenStatus ? <UserComment parentId={params.id} parentType={'article'} isDefault={true}/> : null}
    </>
    }
  </Spinner>
  )
}

export default React.memo(Comments);
