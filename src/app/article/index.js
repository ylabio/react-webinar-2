import React, { useCallback } from "react";
import {
  shallowEqual,
  useSelector as useSelectorRedux,
  useStore as useStoreRedux,
} from "react-redux";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import ArticleCard from "../../components/article-card";
import Spinner from "../../components/spinner";
import Layout from "../../components/layout";
import TopContainer from "../../containers/top";
import HeadContainer from "../../containers/head";
import ToolsContainer from "../../containers/tools";
import actionsArticle from "../../store-redux/article/actions";
import Comments from "./comments";
import A from "../../components/a";
import CommentForm from "../../components/comment-form";
import Comment from "./comments/comment";

function Article() {
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();
  const storeRedux = useStoreRedux();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((s) => s.session);

  useInit(async () => {
    //await store.get('article').load(params.id);
    storeRedux.dispatch(actionsArticle.load(params.id));
    storeRedux.dispatch(actionsArticle.loadComments(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      comments: state.article.comments,
      waiting: state.article.waiting,
      waitComments: state.article.waitingComments,
      waitingSending: state.article.waitingSending,
    }),
    shallowEqual
  );

  const { t } = useTranslate();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    addComment: useCallback(
      (data) =>
        storeRedux.dispatch(
          actionsArticle.sendComment({
            _type: select.article._type,
            _id: select.article._id,
            ...data,
          })
        ),
      [select.article]
    ),
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={select.article.title || ""} />
      <ToolsContainer />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <Spinner active={select.waitComments || select.waitingSending}>
        <Comments
          data={select.comments}
          addComment={callbacks.addComment}
          isPermit={user.status}
          renderLink={
            <>
              <A href={"/login"} onClick={callbacks.onSignIn}>
                Войдите
              </A>
              , чтобы иметь возможность комментировать
            </>
          }
          renderForm={(props) => <CommentForm {...props} />}
          renderComment={(props) => <Comment {...props} />}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Article);
