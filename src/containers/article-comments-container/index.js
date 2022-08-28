import React, {useCallback, useState} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import ArticleComments from "../../components/article-comments";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import actionsArticle from '../../store-redux/article/actions';
import { createTree } from "../../utils/createTree"
import { treeToList } from "../../utils/treeToList"

function ArticleCommentsContainer({ articleId, type }) {

  const storeRedux = useStoreRedux();
  const navigate = useNavigate();
  const location = useLocation();
  const {t, lang} = useTranslate();

  const selectRedux = useSelectorRedux(state => ({
    comments: state.article.comments,
    waiting: state.article.waiting,
  }), shallowEqual);

  const select = useSelector(state => ({
    exists: state.session.exists
  }))

  const [sendId, setSendId] = useState(articleId);

  const callbacks = {
    // Вход
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
    // Отправка запроса на добавление комментария
    sendComment: useCallback((text, parentId, parentType) => storeRedux.dispatch(actionsArticle.addComment(parentId, parentType, text)), []),
    // Отмена офрмы ответа на комментарий
    cancel: useCallback(() => setSendId(articleId), []),
  };

  return (
    <ArticleComments  comments={treeToList(createTree(selectRedux.comments))}
                      sendComment={callbacks.sendComment}
                      onSignIn={callbacks.onSignIn}
                      articleId={articleId}
                      isAuth={select.exists}
                      sendId={sendId}
                      setSendId={setSendId}
                      cancel={callbacks.cancel}
                      articleType={type}
                      t={t}
                      lang={lang} />
    
  );
}

export default React.memo(ArticleCommentsContainer);