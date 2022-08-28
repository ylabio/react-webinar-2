import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Comment from "../../components/comment";
import TextArea from "../../components/text-area";
import { useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual } from "react-redux";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import comments from '../../store-redux/article-comments/actions'
import { useNavigate, useParams } from 'react-router-dom';
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import CommentsCount from "../../components/comment-count"
import Spinner from '../../components/spinner';
import convertData from '../../utils/data-convert';
import CommentPlace from '../comment-place';
import useTranslate from "../../hooks/use-translate";
import CommentControl from "../../components/comments-cotrol";


function CommentWrapper() {
  const navigate = useNavigate()
  const params = useParams();
  const { t, lang } = useTranslate();
  const storeRedux = useStoreRedux();
  useInit(async () => {
    storeRedux.dispatch(comments.load(params.id))
  }, [params.id]);
  const callBacks = {
    closeArea: useCallback(() => { storeRedux.dispatch(comments.openArea("")) }),
    sendComment: useCallback((text, parent_id, parentType) => { storeRedux.dispatch(comments.post(text, parent_id, parentType)) }),
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
  }
  const userId = useSelector(state => state.session.user._id)
  const selectRedux = useSelectorRedux((state) => ({
    comments: state.comments.items,
    count: state.comments.count,
    waiting: state.comments.waiting,
    commentAreaActive: state.comments.commentAreaActive,
  }), shallowEqual);
  const items = {
    comments: useMemo(() => [
      ...treeToList(
        listToTree(selectRedux.comments),
        (item, level) => ({
          ...item,
          padding: 30 * level,
          dateCreate: convertData(item.dateCreate, lang)
        }))
    ], [selectRedux.comments, lang])
  }
  const select = useSelector(state => ({
    exists: state.session.exists
  }))


  return (
    <Spinner active={selectRedux.waiting} >
      <CommentsCount count={selectRedux.count} t={t} />
      {
        items.comments && items.comments.map((comment) => {
          return <div key={comment._id}>
            <Comment comment={comment} />
            <CommentPlace padding={comment.padding} id={comment._id} parentId={comment.parent._id} />
          </div>
        })
      }
      {
        selectRedux.commentAreaActive === "" ?
          select.exists ?
            <TextArea t={t} parent={params.id} isToArticle={true} callBacks={callBacks} />
            :
            <CommentControl isToArticle={true} callBacks={callBacks} t={t} />
          :
          null
      }
    </Spinner>
  )
}

export default React.memo(CommentWrapper);
