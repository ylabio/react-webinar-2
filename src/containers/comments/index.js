import React, {useCallback, useState} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import actionsComments from '../../store-redux/comments/actions';
import Spinner from "../../components/spinner";
import {useLocation, useNavigate} from "react-router-dom";
import LayoutComments from "../../components/comments-folder/layout-comments";
import ListComments from "../../components/comments-folder/list-comments";
import LeaveComment from "../../components/comments-folder/leave-comment";
import PermissionComment from "../../components/comments-folder/permission-comment";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

function Comments() {

  const {t} = useTranslate();

  const navigate = useNavigate();
  const location = useLocation();
  const storeRedux = useStoreRedux();

  const selectStore = useSelector(state => ({
    isAuthorized: state.session.exists,
  }));

  const selectReduxStore = useSelectorRedux(state => ({
    comments: state.comments.data.items,
    count: state.comments.data.count,
    waiting: state.comments.waiting,
    lastCommentId: state.comments.lastCommentId,
    articleId: state.article.data._id,
  }), shallowEqual);

  console.log('id', selectReduxStore.lastCommentId)

  // форматируем коментарии для добавление level
  // за счет этого управлять отступом ответом на коментарии
  let commentaries;
  if (selectReduxStore.comments) {
    commentaries = treeToList(listToTree(selectReduxStore.comments),
      (item, level) => ({...item, level}))
  }

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(selectReduxStore.articleId));
  }, [selectReduxStore.articleId]);

  // состояние для ответа на коментарии, сюда помещается id конретного коментария
  const [isIdReply, setIsIdReply] = useState('')

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
    // По id товара проверяется у какого конкретно коментария открыть форму при нажатии на кнопку "ответить"
    onReply: useCallback((_id) => {
      setIsIdReply(_id)
    }),
    // При нажатии кнопки "отменить" сбрасывает состояние
    onCancelReply: useCallback(() => {
      setIsIdReply('')
    }),
    // Добавление коментариев
    onAddComment: useCallback(async (text, id, type) => {
      await storeRedux.dispatch(actionsComments.addComment(text, id, type));
 
      setIsIdReply('')
    }, []),

    resetCommentId: useCallback(() => {
      storeRedux.dispatch(actionsComments.resetCommentId());
    }, []),
  };

  return (
    <Spinner active={selectReduxStore.waiting}>
      <LayoutComments title={`Комментарии (${selectReduxStore.count})`}>
        <ListComments 
        items={commentaries} 
        isAuthorized={selectStore.isAuthorized} 
        onSignIn={callbacks.onSignIn} 
        isIdReply={isIdReply} 
        onReply={callbacks.onReply} 
        onCancelReply={callbacks.onCancelReply} 
        onAddComment={callbacks.onAddComment}
        resetCommentId={callbacks.resetCommentId}/>

      {(selectStore.isAuthorized && !isIdReply) && <LeaveComment id={selectReduxStore.articleId} onAddComment={callbacks.onAddComment} lastCommentId={selectReduxStore.lastCommentId} resetCommentId={callbacks.resetCommentId}/>}
      {(!selectStore.isAuthorized && !isIdReply) && <PermissionComment onSignIn={callbacks.onSignIn}/>}
      </LayoutComments>
    </Spinner>
  );
}

export default React.memo(Comments);