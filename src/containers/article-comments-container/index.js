import React, { useCallback, useMemo, useState } from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import actionsComments from "../../store-redux/comments/actions";
import Layout from "../../components/article-comments/layout";
import Title from "../../components/article-comments/title";
import Comment from "../../components/article-comments/comment";
import SendContainer from "../send-container";

// Мои функции утилиты
import { createTree } from "../../utils/createTree";
import { treeToList } from "../../utils/treeToList";
// Ваши функции утилиты
// import listToTree from "../../utils/list-to-tree";
// import treeToList from "../../utils/tree-to-list";

function ArticleCommentsContainer({ articleId, type }) {
  const storeRedux = useStoreRedux();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, lang } = useTranslate();

  const selectRedux = useSelectorRedux(
    (state) => ({
      comments: state.comments.data,
      waiting: state.article.waiting,
    }),
    shallowEqual
  );

  const select = useSelector((state) => ({
    exists: state.session.exists,
  }));

  // id родителя для кого показывать форму ответа
  const [sendId, setSendId] = useState(articleId);

  const callbacks = {
    // Вход
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
    // Отправка запроса на добавление комментария
    sendComment: useCallback(
      (text, parentId, parentType) =>
        storeRedux.dispatch(
          actionsComments.addComment(parentId, parentType, text)
        ), []),
    // Отмена офрмы ответа на комментарий
    cancel: useCallback(() => setSendId(articleId), []),
    setId: useCallback((id) => setSendId(id), []),
  };

  const options = {
    // Вариант переиспользования ваших функций listToTree и treeToList
    // comments: useMemo(() => treeToList(listToTree(selectRedux.comments, articleId)), [selectRedux.comments, articleId]),
    comments: useMemo(() => treeToList(createTree(selectRedux.comments)), [selectRedux.comments]),
  }

  console.log("comments: ", options.comments);

  return (
    <Layout>
      <Title count={selectRedux.comments.length} t={t} />

      { options.comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          setSendId={callbacks.setId}
          lang={lang}
          t={t}
          sendContainer={
            <SendContainer
              sendComment={callbacks.sendComment}
              isView={sendId === comment._id}
              parentId={comment._id}
              parentName={comment.author.profile.name}
              parentType={"comment"}
              cancel={callbacks.cancel}
              isAuth={select.exists}
              onSignIn={callbacks.onSignIn}
              title={t("send.new-reply")}
            />
          }
        />
      )) }

      <SendContainer
        sendComment={callbacks.sendComment}
        isView={sendId === articleId}
        parentId={articleId}
        parentType={type}
        cancel={callbacks.cancel}
        isAuth={select.exists}
        onSignIn={callbacks.onSignIn}
        title={t("send.new-comment")}
      />
    </Layout>
  );
}

export default React.memo(ArticleCommentsContainer);
