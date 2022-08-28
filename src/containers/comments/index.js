import React, {useCallback, useState} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import actionsComments from '../../store-redux/comments/actions';
import Spinner from "../../components/spinner";
import {useLocation, useNavigate} from "react-router-dom";
import LayoutComments from "../../components/layout-comments";
import ListComments from "../../components/list-comments";
import LeaveComment from "../../components/leave-comment";
import PermissionComment from "../../components/permission-comment";
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
    articleId: state.article.data._id,
  }), shallowEqual);

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

  const [isReply, setIsReply] = useState('')

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
    // По id товара проверяется у какого конкретно коментария открыть форму при нажатии на кнопку "ответить"
    onReply: useCallback((_id) => {
      setIsReply(_id)
    }),
    // При нажатии кнопки "отменить" сбрасывает состояние
    onCancelReply: useCallback(() => {
      setIsReply('')
    }),
    // Добавление коментариев
    onAddComment: useCallback(async (text, id, type) => {
      await storeRedux.dispatch(actionsComments.addComment(text, id, type));
      setIsReply('')
    }, [])
  };

  return (
    <Spinner active={selectReduxStore.waiting}>
      <LayoutComments title={`Комментарии (${selectReduxStore.count})`}>
        <ListComments items={commentaries} isAuthorized={selectStore.isAuthorized} onSignIn={callbacks.onSignIn} 
        isReply={isReply} onReply={callbacks.onReply} onCancelReply={callbacks.onCancelReply} 
        onAddComment={callbacks.onAddComment}/>

      {(selectStore.isAuthorized && !isReply) && <LeaveComment id={selectReduxStore.articleId} onAddComment={callbacks.onAddComment}/>}
      {(!selectStore.isAuthorized && !isReply) && <PermissionComment onSignIn={callbacks.onSignIn}/>}
      </LayoutComments>
    </Spinner>
  );
}

export default React.memo(Comments);