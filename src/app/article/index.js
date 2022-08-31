import React, { useCallback } from "react";
import {
  shallowEqual,
  useSelector as useSelectorRedux,
  useStore as useStoreRedux,
} from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import A from "../../components/a";
import ArticleCard from "../../components/article-card";
import Comment from "../../components/comment";
import CommentForm from "../../components/comment-form";
import Comments from "../../components/comments";
import Layout from "../../components/layout";
import Spinner from "../../components/spinner";
import HeadContainer from "../../containers/head";
import ToolsContainer from "../../containers/tools";
import TopContainer from "../../containers/top";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import actionsArticle from "../../store-redux/article/actions";
import actionsComments from "../../store-redux/comments/actions";

function Article() {
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();
  const storeRedux = useStoreRedux();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((s) => s.session);

  useInit(async () => {
    storeRedux.dispatch(actionsArticle.load(params.id));
    storeRedux.dispatch(actionsComments.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      comments: state.comments.data,
      waiting: state.article.waiting,
      waitComments: state.comments.waiting,
      waitingSending: state.comments.waitingSending,
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
          actionsComments.sendComment({
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

  const renders = {
    renderForm: useCallback((props) => <CommentForm {...props} />, []),
    renderComment: useCallback((props) => <Comment {...props} />, []),
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
          isPermit={!!user.status}
          renderLink={
            <>
              <A href={"/login"} onClick={callbacks.onSignIn}>
                Войдите
              </A>
              , чтобы иметь возможность комментировать
            </>
          }
          renderForm={renders.renderForm}
          renderComment={renders.renderComment}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Article);
