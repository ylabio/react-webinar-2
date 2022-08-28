import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import actionsComments from '../../store-redux/comments/actions';
import ItemComment from "../../components/item-comment";
import FormAddComment from "../../components/form-add-comment";
import CommentsEntry from "../../components/comments-entry";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import CommentsTotal from "../../components/comments-total";
import ListComments from "../../components/list-comments";

function CommentsContainer(){
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.comments.waiting,
    comments: state.comments.data,
    numberOfComments: state.comments.numberOfComments,
    newCommentText: state.comments.newCommentText,
    parentIdNewComment: state.comments.parentIdNewComment,
    parentTypeNewComment: state.comments.parentTypeNewComment,
    isAttemptAddNewComment: state.comments.isAttemptAddNewComment,
  }), shallowEqual);

  const select1 = useSelector(state => ({
    exists: state.session.exists,
    lang: state.locale.lang
  }));

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(params.id)); 
  }, [params.id]);

  const {t} = useTranslate();

  const callbacks = {
    //Добавление нового комментария
    addComment: useCallback((text, parentId, parentType) => {
      storeRedux.dispatch(actionsComments.addComment(text, parentId, parentType));
    }, []),
    // Попытка добавления нового комментария
    attemptAddNewComment: useCallback((text, parentId, parentType) => {
      storeRedux.dispatch(actionsComments.attemptAddNewComment(text, parentId, parentType));
    }, []),
  };

  const commentData = {
    comments: useMemo(() => [
      ...treeToList(
           listToTree(select.comments, params.id),
           (item, level) => ({...item, padding: level * 30})
      )
    ], [select.comments])
  }

  useEffect(() => {
    if (select.isAttemptAddNewComment) {
      callbacks.addComment(select.newCommentText, select.parentIdNewComment, select.parentTypeNewComment);
    }
  }, [select.isAttemptAddNewComment])

  useEffect(() => {
    storeRedux.dispatch(actionsComments.load(params.id)); 
  }, [select.isAttemptAddNewComment])

  const [id, changeId] = useState('');
  const [textComment, changeTextComment] = useState('');
  const findItem = commentData.comments.find(i => i._id === id);

  const link = '/login';
 
  useEffect(() => {
    if (id) {
      changeTextComment(`${t('comments.myAnswerFor')} ${findItem.author.profile.name}`)
    } 
  }, [id])
  
  const renders = {
    itemComment: useCallback(item => (
      <ItemComment item={item}
                  ids={params.id}
                  exists={select1.exists}
                  attemptAddNewComment={callbacks.attemptAddNewComment}
                  id={id}
                  changeId={changeId}
                  textComment={textComment}
                  changeTextComment={changeTextComment}
                  t={t}
      />
    )),
  }

  return (
    <Spinner active={select.waiting}>
      <CommentsTotal numberOfComments={select.numberOfComments} t={t}/>
      <ListComments items={commentData.comments} renderItem={renders.itemComment}/>
      {
        !id &&
          (
            select1.exists ?
              <FormAddComment id={params.id} attemptAddNewComment={callbacks.attemptAddNewComment} t={t} lang={select1.lang}/>
            :
              <CommentsEntry link={link} t={t}/>
          )
      } 
      </Spinner>

  )
}

export default React.memo(CommentsContainer);
