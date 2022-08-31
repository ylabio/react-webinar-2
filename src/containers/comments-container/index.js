import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useSelector from "../../hooks/use-selector";
import {useLocation, useNavigate, useParams} from "react-router-dom";
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
import LayoutComments from "../../components/layout-comments";
import LayuotItemComment from "../../components/layuot-item-comment";
import FormAnswer from "../../components/form-answer";
import FormEntry from "../../components/form-entry";

function CommentsContainer(){
  // Параметры из пути /articles/:id
  const params = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const storeRedux = useStoreRedux();

  const {t} = useTranslate();

  const select = useSelectorRedux(state => ({
    waiting: state.comments.waiting,
    comments: state.comments.data,
    numberOfComments: state.comments.numberOfComments,
    newCommentText: state.comments.newCommentText,
    parentIdNewComment: state.comments.parentIdNewComment,
    parentTypeNewComment: state.comments.parentTypeNewComment,
    isAttemptAddNewComment: state.comments.isAttemptAddNewComment,
    scrollCommentId: state.comments.scrollCommentId

  }), shallowEqual);

  const select1 = useSelector(state => ({
    exists: state.session.exists,
    ownName: state.session.user.profile?.name,
    lang: state.locale.lang
  }));

  const callbacks = {
    // Добавление нового комментария
    addComment: useCallback((text, parentId, parentType) => {
      storeRedux.dispatch(actionsComments.addComment(text, parentId, parentType));
    }, []),
    // Попытка добавления нового комментария
    attemptAddNewComment: useCallback((text, parentId, parentType) => {
      storeRedux.dispatch(actionsComments.attemptAddNewComment(text, parentId, parentType));
    }, []),
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
      storeRedux.dispatch(actionsComments.load(params.id)); 
    }, [location.pathname]),
    // Обнуление параметров нового комментария в state
    changeParamsState: useCallback(() => {
      storeRedux.dispatch(actionsComments.changeParamsState());
    }, []),
  };

  useInit(async () => {
    // Загрузка комментариев
    storeRedux.dispatch(actionsComments.load(params.id)); 
  }, []);

  useEffect(() => {
    callbacks.changeParamsState();
  }, [select1.exists])

  const commentData = {
    comments: useMemo(() => [
      ...treeToList(
        listToTree(select.comments, params.id),
        (item, level) => (
          (level <= 11) ?
            {...item, padding: level * 30}
          :
            {...item,  padding: 330}
        )
      )
    ], [select.comments])
  }

  useEffect(() => {
    if (select.isAttemptAddNewComment) {
      callbacks.addComment(select.newCommentText, select.parentIdNewComment, select.parentTypeNewComment);
    }
  }, [select.isAttemptAddNewComment])

  const [id, changeId] = useState('');
  const [textComment, changeTextComment] = useState('');
  const findItem = commentData.comments.find(i => i._id === id);
 
  useEffect(() => {
    if (id) {
      changeTextComment(`${t('comments.myAnswerFor')} ${findItem.author.profile?.name || select1.ownName}`);
    } 
  }, [id])

  const renders = {
    itemComment: useCallback(item => (
      <LayuotItemComment 
        content = {
                    <ItemComment item={item}
                                 t={t}
                                 lang={select1.lang}
                                 changeId={changeId}
                                 scrollCommentId={select.scrollCommentId}
                                 ownName={select1.ownName}
                    />
                  }
        form = { 
                id === item._id && 
                  (
                    select1.exists ? 
                      <FormAnswer id={id}
                                  t={t} 
                                  changeId={changeId}
                                  textComment={textComment}
                                  padding={item.padding}
                                  attemptAddNewComment={callbacks.attemptAddNewComment}
                                  changeTextComment={changeTextComment}
                      />
                    :
                      <FormEntry changeId={changeId}
                                 onSignIn={callbacks.onSignIn}
                                 t={t}
                                 padding={item.padding}
                      />
                  )
               }
      />
    )),
  }

  return (
    <Spinner active={select.waiting}>
      <LayoutComments head={<CommentsTotal numberOfComments={select.numberOfComments} t={t}/>}>
        <ListComments items={commentData.comments} renderItem={renders.itemComment} style={{'paddingBottom': '92px'}} id={id}/>
        {
          !id &&
            (
              select1.exists ?
                <FormAddComment id={params.id} attemptAddNewComment={callbacks.attemptAddNewComment} t={t}/>
              :
                <CommentsEntry t={t} onSignIn={callbacks.onSignIn}/>
            )
        } 
      </LayoutComments>
    </Spinner> 
  )
}

export default React.memo(CommentsContainer);
